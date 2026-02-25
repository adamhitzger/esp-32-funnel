import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { thePayClient } from "@/server/thepay/client"

// ✅ Sanity client
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

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
      return "Vrácení"

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

    // ❗ vždy vrať 200 i když něco chybí (ThePay retry)
    if (!paymentUid) {
      return NextResponse.json({ ok: true })
    }

    // 🔹 zajímá nás hlavně změna stavu
    if (type === "state_changed") {
      const payment = await thePayClient.getPaymentDetail(paymentUid)

      const newStatus = mapPaymentStateToOrderStatus(payment?.state)

      if (newStatus) {
        await sanity
          .patch(paymentUid) // _id = payment_uid
          .set({ status: newStatus })
          .commit()

        console.log("[ThePay] Order updated:", paymentUid, newStatus)
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
    console.error("[ThePay webhook error]", err)

    // ❗ stále vracíme 200 → zabráníme retry bouři
    return NextResponse.json({ ok: true })
  }
}
