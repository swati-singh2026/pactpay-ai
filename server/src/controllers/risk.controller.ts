import type { Request, Response } from "express";
import { getGroqClient } from "../lib/groq.js";
import prisma from "../lib/prisma.js";

export const analyzeContractRisks = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.body;

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

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are a professional contract risk analysis assistant.

Analyze the provided contract and identify potential risks.

Return ONLY valid JSON in this format:
{
  "overallRisk": "LOW",
  "summary": "Brief overall risk summary",
  "risks": [
    {
      "title": "Risk title",
      "severity": "HIGH",
      "description": "Explanation of the identified risk",
      "recommendation": "Suggested action to reduce the risk"
    }
  ]
}

Rules:
- overallRisk must be LOW, MEDIUM, or HIGH.
- severity must be LOW, MEDIUM, or HIGH.
- Identify 3 to 5 relevant risks.
- Do not invent contract clauses or missing information.
- Highlight unclear or missing terms as potential risks.
- Provide practical recommendations.
- Do not claim that this analysis is legal advice.
- Return JSON only, without Markdown.`,
        },
        {
          role: "user",
          content: `
Analyze the following contract:

Title: ${contract.title}
Description: ${contract.description}
Amount: ${contract.amount}
Status: ${contract.status}

Identify potential contractual, financial, payment,
scope, and project-related risks.
`,
        },
      ],
      temperature: 0.3,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: "AI could not analyze the contract.",
      });
    }

    // Parse AI response
    const analysis = JSON.parse(aiResponse);

    // Validate response structure
    const validSeverities = ["LOW", "MEDIUM", "HIGH"];

    if (
      !validSeverities.includes(analysis.overallRisk) ||
      typeof analysis.summary !== "string" ||
      !Array.isArray(analysis.risks) ||
      analysis.risks.length < 3 ||
      analysis.risks.length > 5
    ) {
      throw new Error("Invalid risk analysis response from AI.");
    }

    const validRisks = analysis.risks.every(
      (risk: any) =>
        typeof risk.title === "string" &&
        typeof risk.description === "string" &&
        typeof risk.recommendation === "string" &&
        validSeverities.includes(risk.severity),
    );

    if (!validRisks) {
      throw new Error("AI generated invalid risk details.");
    }

    return res.status(200).json({
      success: true,
      message: "Contract risk analysis completed successfully!",
      data: analysis,
    });
  } catch (error) {
    console.error("Contract Risk Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze contract risks. Please try again.",
    });
  }
};
