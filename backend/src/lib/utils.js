import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET_KEY } = process.env;
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not configured");
  }

  const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, {
    expiresIn: age,
  });

  res.cookies("jwt", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: age,
    secure: precess.env.NODE_ENC === "development" ? false : true,
  });

  return token;
};
