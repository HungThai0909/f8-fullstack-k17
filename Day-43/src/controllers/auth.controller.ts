import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response.util";
import type { RegisterInput, LoginInput } from "../schemas/auth.schema";

export const authController = {
  register: (req: Request, res: Response) => {
    try {
      const body = req.body as RegisterInput;
      const user = authService.register(body);

      return successResponse(res, user, "Đăng ký thành công", 201);
    } catch (error) {
      if (error instanceof Error) {
        const statusCode =
          (error as Error & { statusCode?: number }).statusCode ?? 500;

       return errorResponse(
      res,
      "Request failed",
      { message: error.message },
      statusCode
    );
      }

      return errorResponse(res, "Server Error", { message: "Lỗi máy chủ nội bộ" });
    }
  },

  login: (req: Request, res: Response) => {
    try {
      const body = req.body as LoginInput;
      const user = authService.login(body);

      return successResponse(res, user, "Đăng nhập thành công");
    } catch (error) {
      if (error instanceof Error) {
        const statusCode =
          (error as Error & { statusCode?: number }).statusCode ?? 500;

        return errorResponse(
      res,
      "Request failed",
      { message: error.message },
      statusCode
    );
      }

      return errorResponse(res, "Server Error", { message: "Lỗi máy chủ nội bộ" });
    }
  },
};