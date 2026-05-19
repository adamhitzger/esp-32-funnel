import { NextRequest, NextResponse } from "next/server"
import { getPacketStatus, sendStatusMail } from "@/server/action"
import { sanityClient, sanityFetch } from "@/sanity/lib/client"
import { Order, OrderStatuses } from "@/types"
import { GET_PAID_ORDERS } from "@/sanity/lib/queries"


const PACKETA_STATUS_MAP: Record<number, OrderStatuses> = {
  2: "Odeslaná",
  3: "Připraveno k odeslání",
  4: "Odeslaná do cílové destinace",
  5: "Připravena k vyzvednutí",
  7: "Vyzvednutá",
  9: "Vrácená",
  11: "Zrušená",
}

export async function GET(req: NextRequest) {
  try {
    const orders = await sanityFetch<Array<Order>>({
      query: GET_PAID_ORDERS,
    })
    console.log(orders)
    if (!orders?.length) {
      return NextResponse.json({ ok: true, message: "No orders" })
    }

    // ✅ počkej na všechny promisy
    await Promise.all(
      orders.map(async (o: Order) => {
        try {
          if (!o.barcode) return

          const statusCode = await getPacketStatus(o.barcode)
          if (!statusCode.statusCode) return
          console.log(o.barcode,statusCode.statusCode)
          const newStatus = PACKETA_STATUS_MAP[statusCode.statusCode]
          console.log(o.barcode,newStatus)
          if (!newStatus) return

          // 🧠 neupdatuj pokud je status stejný
          if (o.status === newStatus) return

          const updated = await sanityClient
            .patch(String(o._id))
            .set({ 
              status: newStatus,
              payment_status: newStatus === "Vyzvednutá" && o.cod ? "Zaplacená" : "Nezaplacená"
            })
            .commit()

          console.log("[Cron] Updated:", o._id, newStatus)

          if (!updated) {
              console.log("[Cron] Skipped (race):", o._id)
              return
            }
          o.status = newStatus
          // ✉️ email až po úspěchu
          const email = await sendStatusMail(o, getEmailText(statusCode.statusCode), String(o.invoice))
          if(!email){
            console.log("Chyba v odeslání emailu na adresu ",o.email)
            return
          }else{
            console.log("Email byl odeslán na adresu ",o.email)
          }
        } catch (err) {
          console.error("[Cron] Order failed:", o._id, err)
        }
      })
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("ERROR v cron jobu:", error)
    return NextResponse.json({ ok: false }, { status: 200 }) 
  }
}

// 📧 helper na texty
function getEmailText(code: number): string {
  switch (code) {
    case 2:
      return "Objednávka byla předána Zásilkovně."
    case 3:
      return "Připraveno k odeslání do skladu."
    case 4:
      return "Odesláno do cílové destinace."
    case 5:
      return "Připraveno k vyzvednutí."  
    case 7:
      return "Objednávka byla doručena."
    case 9:
      return "Objednávka byla vrácena."
    case 11:
      return "Objednávka byla zrušena."
    default:
      return "Změna stavu objednávky."
  }
}