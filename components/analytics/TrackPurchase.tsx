"use client";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { PRODUCT } from "@/lib/utils";
import { Order } from "@/types";

export function TrackPurchase({ order }: {
  order: Order;
}) {
  useEffect(() => {
    const key = `purchase_tracked_${order.trans_id}`;
    try {
      if (localStorage.getItem(key)) return; // refresh = žádný duplicitní nákup
      localStorage.setItem(key, "1");
    } catch {}

    sendGTMEvent({ ecommerce: null });
    sendGTMEvent({
      event: "purchase",
      // pro Google štítky (tvoje stávající proměnné)
      value: order.total,
      currency: "CZK",
      transaction_id: order.trans_id,
      quantity: order.quantity,
      email: order.email,
      // pro Metu a GA4
      ecommerce: {
        transaction_id: order.trans_id,
        currency: "CZK",
        value: order.total,
        items: [{ ...PRODUCT, quantity: order.quantity }],
      },
      user_data: { email: order.email, phone_number: order.phone },
    });
  }, [order.trans_id]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}