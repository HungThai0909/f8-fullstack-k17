import nodeCron from "node-cron";
import { videoService } from "../services/video.service";

nodeCron.schedule("*/1 * * * *", async () => {
  console.log("[Scheduler] Starting video sync...");
  await videoService.syncAllVideos();
});

console.log("[Scheduler] Video scheduler started. Syncing every 1 minute.");
