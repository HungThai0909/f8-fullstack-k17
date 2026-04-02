import express from "express";
import { homeController } from "../controllers/home.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";

const router = express.Router();
router.use(authMiddleware);

// Home
router.get("/", homeController.index);

// Users
router.get("/users", userController.findAll);
router.get("/users/:id", userController.find);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);   // fix lỗi double slash ở đây
router.post("/users/:id/posts", userController.createPost);

// Products
router.post("/products", validate(createProductSchema), productController.create);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.findOne);
router.put("/products/:id", validate(updateProductSchema), productController.update);
router.delete("/products/:id", productController.delete);

export default router;