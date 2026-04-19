import { videoQueue } from "../queue/video.queue";

videoQueue.upsertJobScheduler(
  "video-sync-scheduler",
  {
    pattern: "*/1 * * * *", 
  },
  {
    name: "sync-all-videos",
  },
);

console.log("[Scheduler] Video scheduler started. Syncing every 1 minute.");