
import { comgate } from '@/lib/comgate/client';
import { sendTelegramMessage } from '@/lib/utils';
import { sanityClient, sanityFetch } from '@/sanity/lib/client';
import { ComgateWebhook } from '@/types';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  try {
    // Comgate posílá JSON (REST API) nebo form-urlencoded (HTTP POST API)
    const contentType = req.headers.get('content-type') || '';
    
    let data: ComgateWebhook;
    
    if (contentType.includes('application/json')) {
      data = await req.json();
    } else {
      // form-urlencoded
      const text = await req.text();
      const params = new URLSearchParams(text);
      data = Object.fromEntries(params) as unknown as ComgateWebhook;
    }

    const { transId, status, refId, secret } = data;

    // 1. Ověř secret
    if (secret !== process.env.COMGATE_API_PASSWORD) {
      return NextResponse.json({ code: 400 }, { status: 400 });
    }

    // 2. Vždy ověř stav přes API (nedůvěřuj jen notifikaci)
    const verified = await comgate.statusOfPayment(transId);
    console.log("Status Promise status: ",verified.code, verified.message)

    if (!verified) {
      return NextResponse.json({ code: 500 }, { status: 500 });
    }
    if(verified.code === 0){
        switch(verified.status){
            case "PAID": 
              await sanityClient
                    .patch(verified.refId)
                    .set({payment_status: "Zaplacená"})
                    .commit();
                    sendTelegramMessage("Objednávka č. "+verified.refId+" byla zaplacena a autorizována")
            break;
            case "CANCELLED":
              await sanityClient.delete(verified.refId)
            break;
        }
    }

    // 4. MUSÍŠ vrátit 200, jinak Comgate zkusí znovu
    return NextResponse.json({ code: 0 }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ code: 500 }, { status: 500 });
  }
}