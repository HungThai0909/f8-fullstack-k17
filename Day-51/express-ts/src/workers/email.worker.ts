import { Job, Worker } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { sendMailTemplate } from "../utils/mail";
import { redisWorkerConnection } from "../utils/bullmq";

new Worker(
  QUEUE.EMAIL,
  async (job: Job) => {
    if (job.name === "send-mail-login-notice") {
      const { email, subject, name, link, otp } = job.data;
      console.log("Đang gửi email");
      throw Error("Gửi email bị lỗi");
      // await sendMailTemplate(email, subject, "login-notice", {
      //   name,
      //   link,
      //   otp,
      // });
      console.log("Đã gửi email");
    }
    //Lưu ý: Nếu không có lỗi gì? bullmq sẽ hiểu là job hoàn thành
    //Nếu có lỗi (throw) bullmq sẽ hiểu là job thất bại
  },
  { connection: redisWorkerConnection! },
);
