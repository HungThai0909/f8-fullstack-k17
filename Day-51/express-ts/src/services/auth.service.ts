import { JwtPayload } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";
import { redisClient } from "../utils/redis";
// import { sendMailTemplate } from "../utils/mail";
import { emailQueue } from "../queue/email.queue";

export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    //Hashing password
    const passwordHash = hashPassword(userData.password);
    //Gọi userService để thêm vào database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
    });
    //Gửi email xác thực, chào mừng
    //Tạo token (Gọi jwtService)
    const accessToken = jwtService.createAccessToken(user.id);
    return { accessToken };
  },
  async login(email: string, password: string) {
    //Find email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("Email or password not correct");
    }
    //Lấy password hash
    const passwordHash = user.password;

    //Verify password
    if (!verifyPassword(password, passwordHash)) {
      throw new Error("Email or password not correct");
    }

    //Tạo token
    const accessToken = jwtService.createAccessToken(user.id);
    const refreshToken = jwtService.createRefreshToken(user.id);

    //Lưu redis
    //key: refreshToken:{userId}:{refreshJti}
    //value: {"access": "accessJti", "refresh": "refreshJti", "userId": userIDvalue}
    await this.saveRefreshRedis(user.id, accessToken, refreshToken);

    //Gửi email
    await emailQueue.add("send-mail-login-notice", {
      email: user.email,
      subject: "[F8 Training] Cảnh báo đăng nhập",
      name: user.name,
      link: "https://f8.edu.vn",
      otp: "1234",
    });
    // await sendMailTemplate(
    //   user.email,
    //   "[F8 Training] Cảnh báo đăng nhập",
    //   "login-notice",
    //   { name: user.name, link: "https://f8.edu.vn", otp: "1234" },
    // );

    return { accessToken, refreshToken };
  },

  async refreshToken(refreshToken: string) {
    //Vefify token
    const decoded = jwtService.verifyRefreshToken(refreshToken) as JwtPayload;
    if (!decoded) {
      return false;
    }
    //Check redis
    const tokenFromRedis = await redisClient.get(
      `refreshToken:${decoded.userId}:${decoded.jti}`,
    );
    if (!tokenFromRedis) {
      return false;
    }
    //Tạo token mới
    const accessToken = jwtService.createAccessToken(decoded.userId);
    const newRefreshToken = jwtService.createRefreshToken(decoded.userId);
    //Thu hồi refresh cũ (Refresh Token rotation)
    await redisClient.del(`refreshToken:${decoded.userId}:${decoded.jti}`);
    //Lưu token mới redis
    await this.saveRefreshRedis(decoded.userId, accessToken, newRefreshToken);
    //Trả về
    return { accessToken, newRefreshToken };
  },

  async saveRefreshRedis(
    userId: number,
    accessToken: string,
    refreshToken: string,
  ) {
    const decodedAccess = jwtService.decodedToken(accessToken) as JwtPayload;
    const decodedRefresh = jwtService.decodedToken(refreshToken) as JwtPayload;
    const ttlRefresh = Math.ceil(decodedRefresh.exp! - Date.now() / 1000);
    await redisClient.setEx(
      `refreshToken:${userId}:${decodedRefresh.jti}`,
      ttlRefresh,
      JSON.stringify({
        access: decodedAccess.jti,
        refresh: decodedRefresh.jti,
        userId: userId,
      }),
    );
  },

  async profile(token: string) {
    //verfify token
    const decoded = jwtService.verifyAccessToken(token) as JwtPayload;
    if (!decoded) {
      return false;
    }
    //Check blacklist
    const blacklist = await redisClient.get(`blacklist:${decoded.jti}`);
    if (blacklist) {
      return false;
    }
    const { userId } = decoded as JwtPayload;
    //Query db
    const user = await userService.find(userId);
    //Check user block không? verify chưa?
    return user;
  },
  async logout(token: string) {
    const { exp, jti } = jwtService.decodedToken(token) as JwtPayload;
    const seconds = Math.ceil(exp! - Date.now() / 1000);
    // await redisClient.set(`blacklist:${token}`, 1);
    await redisClient.setEx(`blacklist:${jti}`, seconds, "1");
    return true;
  },
};

/*
1 số tình huống phát hiện bị lộ

- accessToken được sử dụng ở 2 nơi trở lên
+ Dùng JWT Fingerprints
+ Xác thực chéo thiết bị đã đăng nhập

- refreshToken bị lộ: 
+ refresh đã bị thu hồi nhưng vẫn được gọi lên nhiều lần
==> Lấy được userId từ payload của refresh
==> Tìm userId đó có tồn tại trên redis
==> Kiểm tra jtiRefresh token với userId đó có tồn tại không? Nếu không tồn tại ==> Refresh đó đã bị thu hồi ==> Xóa refresh khỏi redis, lấy jti access thêm vào blacklist

+ refresh chưa bị thu hồi được sử dụng ở 2 nơi trở lên

==> JWT Fingerprints
==> Xác thực chéo thiết bị đã đăng nhập
*/
