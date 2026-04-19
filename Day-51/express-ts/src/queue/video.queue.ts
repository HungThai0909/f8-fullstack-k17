import { Queue } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { redisQueueConnection } from "../utils/bullmq";

export const videoQueue = new Queue(QUEUE.VIDEO, {
  connection: redisQueueConnection!,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});