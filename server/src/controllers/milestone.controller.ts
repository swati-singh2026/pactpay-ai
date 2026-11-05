import type { Request, Response } from "express";
import { getGroqClient } from "../lib/groq.js";
import prisma from "../lib/prisma.js";

export const generateMilestones = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.body;

    if (!contractId) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required.",
      });
    }

    // Find contract and verify ownership
    const contract = await prisma.contract.findFirst({
      where: {
        id: contractId,
        clientId: (req as Request & { userId: string }).userId,
      },
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found or access denied.",
      });
    }

    // Generate milestones using Groq AI
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are a professional project manager.
Generate practical project milestones based on the contract details.
Return ONLY valid JSON in this exact format:
{
  "milestones": [
    {
      "title": "Milestone title",
      "amount": 1000
    }
  ]
}
The milestone amounts must be positive numbers.
The total of all milestone amounts must equal the contract amount.
Do not include markdown or explanations.`,
        },
        {
          role: "user",
          content: `
Contract Title: ${contract.title}
Contract Description: ${contract.description}
Total Contract Amount: ${contract.amount}

Generate 3 to 6 logical project milestones.
Distribute the contract amount across the milestones.
`,
        },
      ],
      temperature: 0.3,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: "AI could not generate milestones.",
      });
    }

    // Parse AI response
    const parsedResponse = JSON.parse(aiResponse);
    const milestones = parsedResponse.milestones;

    // Validate AI response
    if (
      !Array.isArray(milestones) ||
      milestones.length < 3 ||
      milestones.length > 6
    ) {
      throw new Error("Invalid milestone format received from AI.");
    }

    const validMilestones = milestones.every(
      (milestone: any) =>
        typeof milestone.title === "string" &&
        milestone.title.trim().length > 0 &&
        Number.isFinite(milestone.amount) &&
        milestone.amount > 0,
    );

    if (!validMilestones) {
      throw new Error("AI generated invalid milestone details.");
    }

    const totalAmount = milestones.reduce(
      (sum: number, milestone: any) => sum + milestone.amount,
      0,
    );

    if (Math.abs(totalAmount - contract.amount) > 0.01) {
      throw new Error("Milestone amounts do not match contract amount.");
    }

    // Save milestones in database
    const savedMilestones = await prisma.$transaction(
      milestones.map((milestone: any) =>
        prisma.milestone.create({
          data: {
            title: milestone.title.trim(),
            amount: milestone.amount,
            contractId: contract.id,
          },
        }),
      ),
    );

    return res.status(201).json({
      success: true,
      message: "Milestones generated and saved successfully!",
      data: {
        milestones: savedMilestones,
      },
    });
  } catch (error) {
    console.error("Milestone Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate milestones. Please try again.",
    });
  }
};
