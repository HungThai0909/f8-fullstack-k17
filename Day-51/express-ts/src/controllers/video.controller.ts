import { Request, Response } from "express";
import { videoService } from "../services/video.service";

export const videoController = {
  findAll: async (req: Request, res: Response) => {
    const videos = await videoService.findAll();
    res.json({
      success: true,
      message: "Get videos success",
      data: videos,
    });
  },

  find: async (req: Request, res: Response) => {
    const { id } = req.params;
    const video = await videoService.find(+id!);
    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
        data: null,
      });
      return;
    }
    res.json({
      success: true,
      message: "Get video success",
      data: video,
    });
  },

  create: async (req: Request, res: Response) => {
    const { url } = req.body as { url: string };
    if (!url) {
      res.status(400).json({
        success: false,
        message: "URL is required",
        data: null,
      });
      return;
    }

    const video = await videoService.create({ url });
    res.status(201).json({
      success: true,
      message: "Create video success",
      data: video,
    });
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    const video = await videoService.delete(+id!);
    res.status(200).json({
      success: true,
      message: "Delete video success",
      data: video,
    });
  },
};