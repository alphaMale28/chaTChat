import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
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
