import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[ERROR] ${err.message}`);

  if (err.message.includes("not found")) {
    res.status(404).json({
      success: false,
      message: err.message,
      data: null,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    data: null,
  });
};
