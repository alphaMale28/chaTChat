import express from "express";
import "dotenv/config"; // or require('dotenv').config({ override: true })
// import dotenv from "dotenv";
// dotenv.config();

import authRouters from "./routes/auth.route.js";
import messageRouters from "./routes/message.route.js";

const app = express();

const PORT = process.env.PORT;

app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);

app.listen(PORT, () => console.log("Server is running"));
