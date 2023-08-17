import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { prisma } from "./prisma";

// Use a better secret and move to .env
const JWT_SECRET = "secret";

const hashAndSaltPassword = (password: string) => bcrypt.hash(password, 10);

const checkPassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const signup = async (email: string, password: string) => {
  // Return null if user already exists
  if (await prisma.user.findUnique({ where: { email } })) {
    return null;
  }

  return prisma.user.create({
    data: { email, password: await hashAndSaltPassword(password) },
  });
};

export const signin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    // check if password matches
    if (await checkPassword(password, user.password)) {
      return user;
    }

    return null;
  }

  return null;
};

export const signJWT = (userID: number) =>
  jwt.sign({ userID }, JWT_SECRET, {
    expiresIn: "7d",
  });

export const decodeJWT = (token: string): number | null => {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === "string" || typeof decoded.userID === "undefined") {
    return null;
  }

  return decoded.userID;
};
