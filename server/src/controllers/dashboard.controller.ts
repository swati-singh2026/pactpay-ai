import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const getDashboard = async (_req: Request, res: Response) => {
  try {
    const [
      totalContracts,
      completedContracts,
      activeProjects,
      totalPayments,
      paidPayments,
      pendingPayments,
      failedPayments,
      revenue,
    ] = await Promise.all([
      prisma.contract.count(),

      prisma.contract.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.contract.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.payment.count(),

      prisma.payment.count({
        where: {
          status: "PAID",
        },
      }),

      prisma.payment.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.payment.count({
        where: {
          status: "FAILED",
        },
      }),

      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "PAID",
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue: revenue._sum.amount ?? 0,
        totalContracts,
        completedContracts,
        activeProjects,
        totalPayments,
        paidPayments,
        pendingPayments,
        failedPayments,
      },
    });
  } catch (error) {
    console.error("Dashboard Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard analytics.",
    });
  }
};
