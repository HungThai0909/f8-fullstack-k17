  import IORedis from "ioredis";
  let redisQueueConnection = null;
  let redisWorkerConnection = null;
  if (!redisQueueConnection) {
    redisQueueConnection = new IORedis({
      port: 6380,
    });
  }
  if (!redisWorkerConnection) {
    redisWorkerConnection = new IORedis({
      port: 6380,
      maxRetriesPerRequest: null,
    });
  }

  export { redisQueueConnection, redisWorkerConnection };
