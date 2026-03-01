import { NextRequest, NextResponse } from "next/server"
import { sanityClient as sanity, sanityFetch } from "@/sanity/lib/client"
import { thePayClient } from "@/server/thepay/client"
import { createPacket, ensureInvoicePdf, sendStatusMail } from "@/server/action"
import { Order } from "@/types"
import { GET_ORDER_BY_ID } from "@/sanity/lib/queries"


// ✅ mapování payment state → order status
function mapPaymentStateToOrderStatus(state?: string): string | null {
  switch (state) {
    case "paid":
      return "Zaplacená"

    case "waiting_for_payment":
    case "waiting_for_confirmation":
    case "preauthorized":
      return "Přijatá"

    case "refunded":
    case "partially_refunded":
      return "Vrácená"

    case "expired":
    case "error":
    case "preauth_cancelled":
    case "preauth_expired":
      return "Zrušená"

    default:
      return null
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const paymentUid = searchParams.get("payment_uid")
    const projectId = searchParams.get("project_id")
    const type = searchParams.get("type")

    console.log("[ThePay webhook]", {
      paymentUid,
      projectId,
      type,
    })
    console.log("STEP 1")
    // ❗ vždy vrať 200 i když něco chybí (ThePay retry)
    if (!paymentUid) {
      return NextResponse.json({ ok: true })
    }

    // 🔹 zajímá nás hlavně změna stavu
    if (type === "state_changed") {
      const payment = await thePayClient.getPaymentDetail(paymentUid)
      console.log("STEP 2")
      if(payment){
      const newStatus = mapPaymentStateToOrderStatus(payment?.state)
      console.log("STEP 3", newStatus)
      if (newStatus) {
        if(newStatus === "Zaplacená"){
          const id = paymentUid
          console.log("ID",id)
         const order: Order | null = await sanityFetch<Order>({query: GET_ORDER_BY_ID, params: { id }})
          console.log(order)
          if (!order) {
            return NextResponse.json({ ok: true, message: "[ThePay /api] Nepodařilo se fetchnout objednávku ze Sanity" })
          }
          console.log("STEP 4")
          /*const {firstName, lastName, email, phone,packetaId , total} = order
          const packeta = await createPacket({
            name: firstName,
            surname: lastName,
            email,
            phone,
            packetaId: Number(packetaId),
            total: total,
            uid: id
          })
          if (!packeta) {
              return NextResponse.json({ ok: false, message: "[ThePay /api] Nepodařilo se zapsat do Zásilkovny" })
            }*/
//console.log("STEP 5", packeta)
          const invoice = await ensureInvoicePdf(order);
          
          if(!invoice.asset_id){
            return NextResponse.json({ ok: true, message: "[ThePay /api] Nepodařilo se získat fakturu od ThePay" })
          }

         console.log("STEP 6", invoice)
          const updateOrderStatus = await sanity
              .patch(paymentUid) // _id = payment_uid
              .set({ 
                status: newStatus,
                barcode: "packeta",
                invoice: {
                  _type: "file",
                  asset: {
                    _type: "reference",
                    _ref: invoice.asset_id,
                  },
                }
              }).commit()
            console.log("[ThePay] Order status:", updateOrderStatus)
            console.log("STEP 7")
            const sendMail = await sendStatusMail(order, "Objednávka byla zaplacena.", invoice.url)
            if(!sendMail){
              return NextResponse.json({ ok: false, message: "[ThePay /api] Nepodařilo se odeslat email" })
            }
        }else{
          const updateOrderStatus = await sanity
          .patch(paymentUid) // _id = payment_uid
          .set({ 
            status: newStatus,
          })
          .commit()
           console.log("[ThePay] Order status:", updateOrderStatus)
        }
        
        console.log("[ThePay] Order updated:", paymentUid, newStatus)
      }else{
         return NextResponse.json({ ok: true, message: "[ThePay] Nepodařilo se fetchnout objednavku z ThePay" })
      }
      }
    }

    // 🔹 získání bankovního účtu (volitelné logování)
    if (type === "offset_account_obtained") {
      console.log(
        "[ThePay] offset_account_obtained for payment:",
        paymentUid
      )     
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[ThePay webhook error]",err)

    // ❗ stále vracíme 200 → zabráníme retry bouři
    return NextResponse.json({ ok: true })
  }
}
