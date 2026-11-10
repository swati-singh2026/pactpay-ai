import {
  CheckoutPaymentIntent,
  OrdersController,
  PaypalExperienceUserAction,
  PaypalWalletContextShippingPreference,
} from "@paypal/paypal-server-sdk";

import { paypalClient } from "../lib/paypal.js";

// Create PayPal Sandbox Order
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

      paymentSource: {
        paypal: {
          experienceContext: {
            returnUrl: "http://localhost:3000/dashboard/payments/success",

            cancelUrl: "http://localhost:3000/dashboard/payments/cancel",

            userAction: PaypalExperienceUserAction.PayNow,

            shippingPreference:
              PaypalWalletContextShippingPreference.NoShipping,
          },
        },
      },
    },

    prefer: "return=representation",
  });

  console.log("PayPal Order Created:", response.result.id);

  return response.result;
};

// Capture PayPal Payment
export const capturePayPalPayment = async (orderId: string) => {
  try {
    const response = await new OrdersController(paypalClient).captureOrder({
      id: orderId,
    });

    console.log("PayPal Capture Status:", response.result.status);

    return response.result;
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    throw error;
  }
};
