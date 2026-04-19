import { Request, Response } from "express";
import { productService } from "../services/product.service";

export const productController = {
  findAll: async (req: Request, res: Response) => {
    const products = await productService.findAll();
    res.json({
      success: true,
      message: "Get products success",
      data: products,
    });
  },

  find: async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productService.find(+id!);
    res.json({
      success: true,
      message: "Get product success",
      data: product,
    });
  },

  create: async (req: Request, res: Response) => {
    const product = await productService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Create product success",
      data: product,
    });
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productService.update(+id!, req.body);
    res.json({
      success: true,
      message: "Update product success",
      data: product,
    });
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    await productService.delete(+id!);
    res.status(204).send();
  },
};