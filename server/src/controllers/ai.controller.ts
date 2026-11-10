import type { Request, Response } from "express";
import { getGroqClient } from "../lib/groq.js";

export const generateContract = async (req: Request, res: Response) => {
  try {
    const {
      title,
      contractType,
      amount,
      clientName,
      freelancerName,
      startDate,
      endDate,
      paymentTerms,
      description,
      additionalRequirements,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !contractType ||
      !amount ||
      !clientName ||
      !freelancerName ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required contract details.",
      });
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Contract amount must be greater than zero.",
      });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date.",
      });
    }

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are a professional contract drafting assistant. Draft clear, structured contracts based only on the details provided. Do not invent missing facts or claim the contract is legally approved. Include relevant clauses and mark unspecified legal details for review.",
        },
        {
          role: "user",
          content: `
Generate a professional ${contractType} contract using these details:

Contract Title: ${title}
Contract Amount: ${amount}
Client Name: ${clientName}
Freelancer Name: ${freelancerName}
Start Date: ${startDate}
End Date: ${endDate}
Payment Terms: ${paymentTerms || "Not specified"}
Description: ${description}
Additional Requirements: ${additionalRequirements || "None"}

Include:
1. Contract title
2. Parties involved
3. Scope of work
4. Payment terms
5. Project timeline
6. Responsibilities of both parties
7. Confidentiality
8. Termination conditions
9. Dispute resolution
10. Signature section

Use professional and easy-to-understand language.
`,
        },
      ],
      temperature: 0.4,
    });

    const generatedContract = completion.choices[0]?.message?.content;

    if (!generatedContract) {
      return res.status(500).json({
        success: false,
        message: "AI could not generate the contract.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contract generated successfully!",
      data: {
        generatedContract,
      },
    });
  } catch (error) {
    console.error("AI Contract Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate contract. Please try again.",
    });
  }
};
export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are PactPay AI Assistant, an intelligent assistant
          for a freelance contract and payment management platform.

          Help users with:
          1. Contracts and agreements
          2. Milestone management
          3. PayPal payments
          4. Freelancing guidance
          5. Project management

          Give clear, friendly and helpful answers.
          Never claim to perform actions that you have not performed.`,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        success: false,
        message: "AI could not generate a response.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      data: {
        reply,
      },
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get AI response. Please try again.",
    });
  }
};
