import jwt from "jsonwebtoken";
// import "dotenv/config";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: age,
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
