import { Job, Worker } from "bullmq";
import { redisWorkerConnection } from "../utils/bullmq";
import { QUEUE } from "../constants/queue.constant";
import { videoService } from "../services/video.service";

new Worker(
  QUEUE.VIDEO,
  async (job: Job) => {
    if (job.name === "sync-all-videos") {
      console.log("[Worker] Starting sync all videos...");
      await videoService.syncAllVideos();
      console.log("[Worker] Sync all videos completed.");
    }
  },
  { connection: redisWorkerConnection! },
);