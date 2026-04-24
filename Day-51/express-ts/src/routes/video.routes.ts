import express from "express";
import { videoController } from "../controllers/video.controller";

const router = express.Router();

router.get("/", videoController.findAll);
router.get("/:id", videoController.find);
router.post("/", videoController.create);
router.delete("/:id", videoController.delete);

export default router;