import { Request, Response } from "express";
import { productService } from "../services/product.service";

export const productController = {
  index: async (req: Request, res: Response) => {
    const products = await productService.findAll();
    res.json({
      success: true,
      message: "Get products success",
      data: products,
    });
  },
  create: async (req: Request, res: Response) => {
    const product = await productService.create(req.body);
    res.json({
      success: true,
      message: "Create product success",
      data: product,
    });
  },
};
