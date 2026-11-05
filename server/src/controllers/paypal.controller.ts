import { Request, Response } from "express";
import {
  createPayPalOrder,
  capturePayPalPayment,
} from "../services/paypal.service.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (
      typeof amount !== "string" ||
      !/^\d+(\.\d{1,2})?$/.test(amount) ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid payment amount.",
      });
    }

    const order = await createPayPalOrder(amount);

    return res.status(201).json({
      success: true,
      message: "PayPal order created successfully.",
      order,
    });
  } catch (error) {
    console.error("PayPal Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create PayPal order.",
    });
  }
};
export const capturePayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    if (typeof orderId !== "string" || !orderId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid PayPal order ID is required.",
      });
    }

    const payment = await capturePayPalPayment(orderId);

    return res.status(200).json({
      success: true,
      message: "Payment captured successfully.",
      payment,
    });
  } catch (error) {
    console.error("PayPal Capture Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to capture PayPal payment.",
    });
  }
};
