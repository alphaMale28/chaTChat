import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";

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

    if (newUser)
      //   generateToken(newUser._id, res);
      await newUser.save();

    res.status(201).json({ message: "User created successfully" });
    // res.status(201).json({
    //   _id: newUser._id,
    //   fullName: newUser.fullName,
    //   email: newUser.email,
    //   profilePic: newUser.profilePic,
    // });

    // else {
    //   res.status(400).json({ message: "Invalid user data" });
    // }
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
