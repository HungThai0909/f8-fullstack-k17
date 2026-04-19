import { redisClient } from "./redis";
export const cache = {
  async remember<T>(key: string, callback: () => T, ttl = 3600) {
    //Check redis xem có tồn tại
    const dataFromCache = await redisClient.get(key);
    if (!dataFromCache) {
      const dataFromDb = await callback();
      //Ghi dữ liệu mới vào redis
      redisClient.setEx(key, ttl, JSON.stringify(dataFromDb));
      return dataFromDb;
    }
    return JSON.parse(dataFromCache);
  },
  async forever<T>(key: string, callback: () => T) {
    const dataFromCache = await redisClient.get(key);
    if (!dataFromCache) {
      const dataFromDb = await callback();
      //Ghi dữ liệu mới vào redis
      redisClient.set(key, JSON.stringify(dataFromDb));
      return dataFromDb;
    }
    return JSON.parse(dataFromCache);
  },
  forget(key: string) {
    redisClient.del(key);
  },
};
