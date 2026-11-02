import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  signupService,
  loginService,
  getCurrentUser,
} from "../services/auth.service.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await signupService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Invalid credentials",
    });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getCurrentUser(req.userId!);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Unauthorized",
    });
  }
};
