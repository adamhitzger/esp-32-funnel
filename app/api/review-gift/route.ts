import { sanityClient } from "@/sanity/lib/client";
import { GET_ORDERS_AFTER_WEEK } from "@/sanity/lib/queries";
import { Order } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const getOrders: Order[] = await sanityClient.fetch(GET_ORDERS_AFTER_WEEK,{},{cache: "no-store"});
        console.log(getOrders)
        return NextResponse.json({ ok: true , status: 200})
    } catch(error){
         return NextResponse.json({ ok: false , status: 500})
    }
}