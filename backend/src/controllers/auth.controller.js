import bcrypt from "bcryptjs";
// import "dotenv/config";
import { ENV } from "../lib/env.js";

import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
  const { fullName, email: emailInput, password } = req.body;
  const email = String(emailInput || "")
    .toLowerCase()
    .trim();

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email is valid regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User is already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      // generateToken(savedUser._id, res);

      res.status(201).json({ message: "User created successfully" });

      // res.status(201).json({
      //   _id: newUser._id,
      //   fullName: newUser.fullName,
      //   email: newUser.email,
      //   profilePic: newUser.profilePic,
      // });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Failed to created User " });
    // res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  res.send("Login endpoint");
};

export const logout = async (req, res) => {
  res.send("logout endpoint");
};
