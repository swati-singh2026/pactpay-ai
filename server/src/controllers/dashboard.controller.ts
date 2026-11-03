import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const getDashboard = async (_req: Request, res: Response) => {
  try {
    const contracts = await prisma.contract.count();

    const payments = await prisma.payment.count();

    const activeProjects = await prisma.contract.count({
      where: {
        status: "ACTIVE",
      },
    });

    const revenue = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "PAID",
      },
    });

    res.json({
      revenue: revenue._sum.amount || 0,
      contracts,
      payments,
      activeProjects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
