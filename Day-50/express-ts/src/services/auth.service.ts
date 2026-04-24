import { JwtPayload } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";
import { redisClient } from "../utils/redis";
import { sendMailTemplate } from "../utils/mail";
import { prisma } from "../utils/prisma";

export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    //Hashing password
    const passwordHash = hashPassword(userData.password);
    //Gọi userService để thêm vào database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
    });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`verify:${user.id}`, 600, otp);
    await sendMailTemplate(
      user.email,
      "[F8 Training] Xác thực tài khoản",
      "verify-email",
      { name: user.name, otp },
    );
    //Gửi email xác thực, chào mừng
    //Tạo token (Gọi jwtService)

    const accessToken = jwtService.createAccessToken(user.id);
    return { accessToken };
  },

  async verifyEmail(userId: number, otp: string) {
    const storedOtp = await redisClient.get(`verify:${userId}`);
    if (!storedOtp) {
      throw new Error("OTP expired or not found");
    }
    if (storedOtp !== otp) {
      throw new Error("OTP invalid");
    }
    await prisma.user.update({
      where: { id: userId },
      data: { is_verified: true },
    });
    await redisClient.del(`verify:${userId}`);
    return true;
  },
  async resendVerifyEmail(userId: number) {
    const user = await userService.find(userId);
    if (user.is_verified) {
      throw new Error("Account already verified");
    }
    const resendKey = `resend:${userId}`;
    const count = await redisClient.incr(resendKey);
    if (count === 1) {
      await redisClient.expire(resendKey, 60);
    }
    if (count > 3) {
      throw new Error("Too many resend requests. Please wait 60 seconds.");
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`verify:${userId}`, 600, otp);

    await sendMailTemplate(
      user.email,
      "[F8 Training] Xác thực tài khoản (gửi lại)",
      "verify-email",
      { name: user.name, otp },
    );

    return true;
  },
  async login(email: string, password: string) {
    //Find email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("Email or password not correct");
    }
    if (!verifyPassword(password, user.password)) {
      throw new Error("Email or password not correct");
    }

    //Verify password
    if (!user.is_verified) {
      throw new Error(
        "Account not verified. Please check your email or request a new verification email.",
      );
    }

    //Tạo token
    const accessToken = jwtService.createAccessToken(user.id);
    const refreshToken = jwtService.createRefreshToken(user.id);

    //Lưu redis
    //key: refreshToken:{userId}:{refreshJti}
    //value: {"access": "accessJti", "refresh": "refreshJti", "userId": userIDvalue}
    await this.saveRefreshRedis(user.id, accessToken, refreshToken);

    //Gửi email
    await sendMailTemplate(
      user.email,
      "[F8 Training] Cảnh báo đăng nhập",
      "login-notice",
      { name: user.name, link: "https://f8.edu.vn", otp: "------" },
    );

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
    return { accessToken: accessToken, refreshToken: newRefreshToken };
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
  async forgotPassword(email: string) {
    const user = await userService.findByEmail(email);
    if (!user) {
      return true;
    }
    const resendKey = `resend_reset:${user.id}`;
    const count = await redisClient.incr(resendKey);
    if (count === 1) {
      await redisClient.expire(resendKey, 60);
    }
    if (count > 3) {
      throw new Error("Too many requests. Please wait 60 seconds.");
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`reset:${user.id}`, 600, otp);

    await sendMailTemplate(
      user.email,
      "[F8 Training] Đặt lại mật khẩu",
      "reset-password",
      { name: user.name, otp },
    );
    return true;
  },
  async resetPassword(email: string, otp: string, newPassword: string) {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw new Error("OTP expired or not found");
  }
  const storedOtp = await redisClient.get(`reset:${user.id}`);
  if (!storedOtp) {
    throw new Error("OTP expired or not found");
  }
  if (storedOtp !== otp) {
    throw new Error("OTP invalid");
  }
  const passwordHash = hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: passwordHash },
  });
  await redisClient.del(`reset:${user.id}`);
  await this.revokeAllRefreshTokens(user.id);
  return true;
},
  async revokeAllRefreshTokens(userId: number) {
    const keys = await redisClient.keys(`refreshToken:${userId}:*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
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
