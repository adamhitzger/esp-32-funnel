"use client";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { PRODUCT } from "@/lib/utils";

export function TrackViewItem() {
  useEffect(() => {
    sendGTMEvent({ ecommerce: null });
    sendGTMEvent({
      event: "view_item",
      value: PRODUCT.price,
      currency: "CZK",
      ecommerce: { currency: "CZK", value: PRODUCT.price, items: [{ ...PRODUCT, quantity: 1 }] },
    });
  }, []);
  return null;
}