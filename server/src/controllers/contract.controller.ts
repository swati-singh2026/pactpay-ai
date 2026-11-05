import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import prisma from "../lib/prisma.js";

// CREATE CONTRACT
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

// UPDATE EXISTING CONTRACT
export const updateContract = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { title, description, amount } = req.body;

    // Validate contract ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required",
      });
    }

    // Validate required fields
    if (!title || !description || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description and amount",
      });
    }

    // Validate amount
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Contract amount must be greater than zero",
      });
    }

    // Find contract and verify ownership
    const existingContract = await prisma.contract.findFirst({
      where: {
        id,
        clientId: req.userId!,
      },
    });

    if (!existingContract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found or access denied",
      });
    }

    // Update existing contract
    const updatedContract = await prisma.contract.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        amount: Number(amount),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Contract updated successfully",
      data: updatedContract,
    });
  } catch (error) {
    console.error("Update Contract Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contract",
    });
  }
};
