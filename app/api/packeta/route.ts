import { NextRequest, NextResponse } from "next/server"
import { getPacketStatus, sendStatusMail } from "@/server/action"
import { sanityClient, sanityFetch } from "@/sanity/lib/client"
import { Order } from "@/types"
import { GET_PAID_ORDERS } from "@/sanity/lib/queries"

// 🔥 mapování Packeta → order status (doporučeno technické klíče)
const PACKETA_STATUS_MAP: Record<number, string> = {
  2: "Odeslána",
  7: "Vyzvednutá",
  9: "Vrácená",
  11: "Zrušená",
}

export async function GET(req: NextRequest) {
  try {
    const orders = await sanityFetch<Array<Order>>({
      query: GET_PAID_ORDERS,
    })

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

          const newStatus = PACKETA_STATUS_MAP[statusCode.statusCode]
          if (!newStatus) return

          // 🧠 neupdatuj pokud je status stejný
          if (o.status === newStatus) return

          const updated = await sanityClient
            .patch(o._id)
            .set({ status: newStatus })
            .commit()

          console.log("[Cron] Updated:", o._id, newStatus)

          if (!updated) {
              console.log("[Cron] Skipped (race):", o._id)
              return
            }

          // ✉️ email až po úspěchu
          const email = await sendStatusMail(o, getEmailText(statusCode.statusCode), o.invoice)
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
    return NextResponse.json({ ok: false }, { status: 200 }) // ❗ vždy 200 pro cron
  }
}

// 📧 helper na texty
function getEmailText(code: number): string {
  switch (code) {
    case 2:
      return "Objednávka byla předána Zásilkovně."
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