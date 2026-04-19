import express from "express";
import { productController } from "../controllers/product.controller";
import { errorMiddleware } from "../middlewares/error.middleware"

const router = express.Router();

router.get("/products", productController.findAll);
router.get("/products/:id", productController.find);
router.post("/products", productController.create);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

router.use(errorMiddleware);

export default router;