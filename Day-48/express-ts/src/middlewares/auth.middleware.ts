import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.user = {
    name: "Hoàng An",
  };
  next();
};
