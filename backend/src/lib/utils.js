import jwt from "jsonwebtoken";
// import "dotenv/config";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET_KEY } = ENV;
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not configured");
  }

  const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
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
