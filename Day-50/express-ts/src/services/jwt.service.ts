const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRED = process.env.JWT_EXPIRED as unknown as number;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const JWT_REFRESH_EXPIRED = process.env
  .JWT_REFRESH_EXPIRED as unknown as number;
import jsonwebtoken from "jsonwebtoken";
export const jwtService = {
  createAccessToken(userId: number) {
    const payload = {
      userId,
      jti: crypto.randomUUID(),
    };
    return jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRED,
    });
  },
  verifyAccessToken(token: string) {
    try {
      const decoded = jsonwebtoken.verify(token, JWT_SECRET);
      return decoded;
    } catch {
      return false;
    }
  },
  createRefreshToken(userId: number) {
    const payload = {
      userId,
      jti: crypto.randomUUID(),
    };
    return jsonwebtoken.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRED,
    });
  },
  verifyRefreshToken(token: string) {
    try {
      const decoded = jsonwebtoken.verify(token, JWT_REFRESH_SECRET);
      return decoded;
    } catch {
      return false;
    }
  },
  decodedToken(token: string) {
    return jsonwebtoken.decode(token);
  },
};

//jwtService
// - secret key
// - expired