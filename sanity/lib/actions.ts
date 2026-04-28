import { comgate, ComgateRestClient } from "@/lib/comgate/client";
import { ensureInvoicePdf, sendStatusMail } from "@/server/action";
import { Order } from "@/types";
import { ComposeIcon } from "@sanity/icons";
import { DocumentActionDescription, DocumentActionProps } from "sanity";

export default function refundOrder({
    draft, 
    published, 
    onComplete
}: DocumentActionProps
): DocumentActionDescription  | null {
    const handleAction = async () => {
        const documentData = draft || published
        if(!documentData){
            alert("Žádná data nejsou k dispozici");
            onComplete();
            return;
        }  
        const data = documentData as unknown as Order;
        console.log("RefundOrder Sanity data: ", data)    

        try{
            if(!data.cod){
                    const refund = await comgate.refundOrderById(data.trans_id, Number(data.total), String(data._id));
                    console.log("Refund comgate test:  ", refund.message + " " + refund.code)
            }
                   
            const dobropis = await ensureInvoicePdf(data, false);
            console.log(dobropis)
            
                    const sendMail = await sendStatusMail(data, "Objednávka byla přijata.", dobropis.url)
                    if(!sendMail){
                        alert("Email nebyl odeslán")
                        onComplete();
                        return;
                    }
            
        }catch(error){
            console.error("Send refund function catch error: ", error)
            alert("Vyskytla se chyba")
            onComplete();
            return;
        }            
        
    }

    return {
        label: "Vratka",
        onHandle: handleAction,
        icon: ComposeIcon
    }
}