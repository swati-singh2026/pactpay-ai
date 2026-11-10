import { Request, Response } from "express";
import {
  createPayPalOrder,
  capturePayPalPayment,
} from "../services/paypal.service.js";
import prisma from "../lib/prisma.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { milestoneId } = req.body;

    if (typeof milestoneId !== "string" || !milestoneId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid milestone ID is required.",
      });
    }

    const milestone = await prisma.milestone.findFirst({
      where: {
        id: milestoneId,
        contract: {
          OR: [
            { clientId: (req as Request & { userId: string }).userId },
            { freelancerId: (req as Request & { userId: string }).userId },
          ],
        },
      },
      include: {
        payment: true,
      },
    });

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found or access denied.",
      });
    }

    if (milestone.payment) {
      return res.status(409).json({
        success: false,
        message: "A payment record already exists for this milestone.",
      });
    }

    if (milestone.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "This milestone is already completed.",
      });
    }

    const order = await createPayPalOrder(milestone.amount.toFixed(2));

    const paypalOrderId = order.id;

    if (!paypalOrderId) {
      throw new Error("PayPal did not return an order ID.");
    }

    const payment = await prisma.payment.create({
      data: {
        milestoneId: milestone.id,
        paypalOrderId,
        amount: milestone.amount,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      success: true,
      message: "PayPal order created successfully.",
      order,
      payment,
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
    const userId = (req as Request & { userId?: string }).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (typeof orderId !== "string" || !orderId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid PayPal order ID is required.",
      });
    }

    // Find existing payment and verify ownership
    const existingPayment = await prisma.payment.findFirst({
      where: {
        paypalOrderId: orderId,
        milestone: {
          contract: {
            OR: [{ clientId: userId }, { freelancerId: userId }],
          },
        },
      },
    });

    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found or access denied.",
      });
    }

    // Prevent duplicate capture
    if (existingPayment.status === "PAID") {
      return res.status(200).json({
        success: true,
        message: "Payment has already been captured.",
        payment: existingPayment,
      });
    }

    // Capture payment through PayPal
    const capturedOrder = await capturePayPalPayment(orderId);

    if (capturedOrder.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "PayPal payment capture was not completed.",
      });
    }

    // Update payment and milestone together
    const updatedPayment = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.update({
        where: {
          id: existingPayment.id,
        },
        data: {
          status: "PAID",
        },
      });

      await tx.milestone.update({
        where: {
          id: existingPayment.milestoneId,
        },
        data: {
          status: "COMPLETED",
        },
      });

      return payment;
    });

    return res.status(200).json({
      success: true,
      message: "Payment captured and database updated successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("PayPal Capture Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to capture PayPal payment.",
    });
  }
};
