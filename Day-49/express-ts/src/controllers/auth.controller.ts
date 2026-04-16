import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "Register success",
      data: user,
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or password not correct",
      });
    }
    const tokens = await authService.login(email, password);
    res.status(200).json({
      success: true,
      message: "Login success",
      data: tokens,
    });
  },

  async profile(req: Request, res: Response) {
    res.json({
      success: true,
      message: "Get user profile success",
      data: req.user,
    });
  },

  async logout(req: Request, res: Response) {
    const token = req.token;
    await authService.logout(token as string, req.user!.id);
    res.json({
      success: true,
      message: "Logout success",
    });
  },

  async refreshToken(req: Request, res: Response) {
    const { refreshToken: bodyToken } = req.body;
    if (!bodyToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    try {
      const tokens = await authService.refreshToken(bodyToken);
      return res.status(200).json({
        success: true,
        message: "Refresh token success",
        data: tokens,
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Refresh token invalid or expired",
      });
    }
  },
};
