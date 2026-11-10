import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import prisma from "../lib/prisma.js";

export const getTransactionHistory = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const transactions = await prisma.payment.findMany({
      where: {
        milestone: {
          contract: {
            OR: [{ clientId: userId }, { freelancerId: userId }],
          },
        },
      },
      include: {
        milestone: {
          include: {
            contract: {
              select: {
                id: true,
                title: true,
                clientId: true,
                freelancerId: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Transaction history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction history",
    });
  }
};
