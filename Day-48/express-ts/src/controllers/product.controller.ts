import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { ProductQuery } from "../types/product.type";

export const productController = {
  async create(req: Request, res: Response) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ data: product });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const result = await productService.findAll(
        req.query as unknown as ProductQuery,
      );
      res.json(result);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const product = await productService.findOne(Number(req.params.id));
      res.json({ data: product });
    } catch (error) {
      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const product = await productService.update(
        Number(req.params.id),
        req.body,
      );
      res.json({ data: product });
    } catch (error) {
      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await productService.delete(Number(req.params.id));
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};