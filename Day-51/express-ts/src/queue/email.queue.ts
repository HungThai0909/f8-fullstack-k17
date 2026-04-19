import { Queue } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { redisQueueConnection } from "../utils/bullmq";
export const emailQueue = new Queue(QUEUE.EMAIL, {
  connection: redisQueueConnection!,
  defaultJobOptions: {
    // removeOnComplete: true,
    // removeOnFail: true,
    attempts: 4, //retries = attempts - 1
    backoff: {
      type: "exponential", //2^retries
      delay: 5000,
    }, //Chiến lược delay khi chạy lại
  },
});

//parent queue -> child queue
