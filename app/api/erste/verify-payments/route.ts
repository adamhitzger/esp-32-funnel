import { sanityClient, sanityFetch } from "@/sanity/lib/client";
import { GET_UNPAID_ORDERS } from "@/sanity/lib/queries";
import { Order } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/erste-tokens";
import { createPacket, ensureInvoicePdf, sendStatusMail } from "@/server/action";

function isAuthorized(req: NextRequest) {
  return req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try{
        const unpaidOrders = await sanityFetch<Order[]>({query: GET_UNPAID_ORDERS})
        console.log(unpaidOrders)
        if (unpaidOrders.length === 0) {
            return NextResponse.json({ message: "Žádné nezaplacené objednávky" });
        }

        const token = await getAccessToken();
        
        const dateTo = new Date().toISOString().split("T")[0];
        const dateFrom = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
        
        const url = new URL(
              `https://www.csas.cz/webapi/api/v3/accounts/my/accounts/${process.env.ERSTE_ACCOUNT_ID}/transactions`
            );
        url.searchParams.set("dateStart", dateFrom);
        url.searchParams.set("dateEnd", dateTo);
        url.searchParams.set("size", "200");
        
        const txRes = await fetch(url.toString(), {
              headers: {
                Authorization: `Bearer ${token}`,
                "web-api-key": process.env.ERSTE_API_KEY!,
              },
        });
        if (!txRes.ok) throw new Error(`CSAS API error: ${await txRes.text()}`);
         const txData = await txRes.json();
         const transactions = txData.transactions ?? txData.items ?? [];
         
         const txByVS = new Map<string, any>();
         for (const tx of transactions) {
            try {
                const refs = tx.entryDetails?.transactionDetails?.remittanceInformation?.structured?.creditorReferenceInformation?.reference;
                if (!refs) continue;
                
                const vs = refs[0]?.substring(3);
                const creditDebit = tx.creditDebitIndicator;
                
                if (vs && creditDebit === "CRDT") {
                txByVS.set(vs, tx);
                }
            } catch {
                continue;
            }
        }

        const results = { paid: 0, stillPending: 0 };

        await Promise.all(
        unpaidOrders.map(async (order) => {
            const match = txByVS.get(order.vs);
            if (match) {
                await sanityClient.patch(order._id).set({ status: "Zaplacená" }).commit();
                console.log(order._id)
                if(order.barcode == null){
                    const {firstName, lastName, email, phone,packetaId , total} = order
                    const  packeta = await createPacket({
                            name: firstName,
                            surname: lastName,
                            email,
                            phone,
                            packetaId: Number(packetaId),
                            total: Number(total),
                            uid: order._id,
                    })
                    console.log("Packeta:",packeta, order.barcode)
                }
                const invoice = await ensureInvoicePdf(order);
                console.log("Invoice",invoice)
                const sendMail = await sendStatusMail(order, "Objednávka byla zaplacena.", invoice.url)

                results.paid++;
            } else {
             results.stillPending++;
            }
            })
        );
        return NextResponse.json({ success: true, checked: unpaidOrders.length, ...results });
    }catch(error){
         console.error("Cron error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}