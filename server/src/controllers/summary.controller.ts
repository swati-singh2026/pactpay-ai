import type { Request, Response } from "express";
import { getGroqClient } from "../lib/groq.js";
import prisma from "../lib/prisma.js";

export const generateContractSummary = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.body;

    // Validate Contract ID
    if (!contractId) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required.",
      });
    }

    const userId = (req as Request & { userId?: string }).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required.",
      });
    }

    // Find contract and verify ownership
    const contract = await prisma.contract.findFirst({
      where: {
        id: contractId,
        clientId: userId,
      },
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found or access denied.",
      });
    }

    // Initialize Groq
    const groq = getGroqClient();

    // Generate contract summary using AI
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are a professional contract summarization assistant.

Create a clear and easy-to-understand summary of the provided contract.

Return ONLY valid JSON in this exact format:
{
  "title": "Contract title",
  "overview": "Short overview of the contract",
  "scopeOfWork": "Summary of the work involved",
  "financialDetails": "Summary of contract amount",
  "status": "Contract status",
  "keyPoints": [
    "Important point 1",
    "Important point 2",
    "Important point 3"
  ],
  "reviewNotes": [
    "Important missing information or terms that need review"
  ]
}

Rules:
- Use only the information provided.
- Do not invent missing details.
- Clearly mention when information is unavailable.
- Keep the language professional and simple.
- Return JSON only, without Markdown.`,
        },
        {
          role: "user",
          content: `
Summarize the following contract:

Title: ${contract.title}
Description: ${contract.description}
Amount: ${contract.amount}
Status: ${contract.status}

Generate a concise summary that helps users
understand their contract quickly.
`,
        },
      ],
      temperature: 0.3,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: "AI could not generate the contract summary.",
      });
    }

    // Parse AI response
    const summary = JSON.parse(aiResponse);

    // Validate summary structure
    if (
      typeof summary.title !== "string" ||
      typeof summary.overview !== "string" ||
      typeof summary.scopeOfWork !== "string" ||
      typeof summary.financialDetails !== "string" ||
      typeof summary.status !== "string" ||
      !Array.isArray(summary.keyPoints) ||
      !Array.isArray(summary.reviewNotes)
    ) {
      throw new Error("Invalid summary format received from AI.");
    }

    return res.status(200).json({
      success: true,
      message: "Contract summary generated successfully!",
      data: summary,
    });
  } catch (error) {
    console.error("Contract Summary Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate contract summary. Please try again.",
    });
  }
};
