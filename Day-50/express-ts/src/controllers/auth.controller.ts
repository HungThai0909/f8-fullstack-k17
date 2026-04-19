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
    const token = await authService.login(email, password);
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Login success",
      data: { accessToken: token.accessToken },
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
    await authService.logout(token as string);
    res.clearCookie("refreshToken");
    res.json({
      success: true,
      message: "Logout success",
    });
  },
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    const newToken = await authService.refreshToken(refreshToken);
    if (!newToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token invalid",
      });
    }
    res.cookie("refreshToken", newToken.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Refresh new token success",
      data: { accessToken: newToken.accessToken }, 
    });
  },
  async verifyEmail(req: Request, res: Response) {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "userId and otp are required",
      });
    }
    await authService.verifyEmail(+userId, otp);
    res.json({
      success: true,
      message: "Email verified successfully",
    });
  },
  async resendVerifyEmail(req: Request, res: Response) {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    await authService.resendVerifyEmail(+userId);
    res.json({
      success: true,
      message: "Verification email resent",
    });
  },
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    await authService.forgotPassword(email);
    res.json({
      success: true,
      message: "If the email exists, a reset code has been sent",
    });
  },
  async resetPassword(req: Request, res: Response) {
  const { userId, otp, newPassword } = req.body;
  await authService.resetPassword(+userId, otp, newPassword);
  res.json({
    success: true,
    message: "Password reset successfully. Please login again.",
  });
},
};
