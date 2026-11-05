import {
  CheckoutPaymentIntent,
  OrdersController,
} from "@paypal/paypal-server-sdk";

import { paypalClient } from "../lib/paypal.js";

export const createPayPalOrder = async (amount: string) => {
  const response = await new OrdersController(paypalClient).createOrder({
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: amount,
          },
        },
      ],
    },
    prefer: "return=representation",
  });

  return response.result;
};
export const capturePayPalPayment = async (orderId: string) => {
  const response = await new OrdersController(paypalClient).captureOrder({
    id: orderId,
  });

  return response.result;
};
