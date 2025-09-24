import jwt from "jsonwebtoken";
// import "dotenv/config";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const jwtSecretKey = ENV.JWT_SECRET_KEY;
  if (!jwtSecretKey) {
    throw new Error("JWT_SECRET is not configured");
  }

  // const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign({ id: userId }, ENV.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  // res.cookies("jwt", token, {
  //   httpOnly: true,
  //   sameSite: "Strict",
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  //   secure: ENV.NODE_ENC === "development" ? false : true,
  // });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production", // true only on HTTPS
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
