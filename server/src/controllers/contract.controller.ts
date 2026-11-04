import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import prisma from "../lib/prisma.js";

export const createContract = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, amount, freelancerId } = req.body;

    // Validate required fields
    if (!title || !description || !amount || !freelancerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate contract amount
    if (Number(amount) <= 0 || !Number.isFinite(Number(amount))) {
      return res.status(400).json({
        success: false,
        message: "Contract amount must be greater than zero",
      });
    }

    // Create contract in database
    const contract = await prisma.contract.create({
      data: {
        title,
        description,
        amount: Number(amount),
        clientId: req.userId!,
        freelancerId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Contract created successfully",
      data: contract,
    });
  } catch (error) {
    console.error("Create Contract Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create contract",
    });
  }
};
