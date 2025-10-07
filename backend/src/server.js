import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import { ENV } from "./lib/env.js";
import authRouters from "./routes/auth.route.js";
import messageRouters from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT;

app.use(express.json({ limit: "10mb" })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  const __distDir = path.resolve(__dirname, "../frontend/dist");
  app.use(express.static(path.join(__distDir)));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__distDir, "index.html"));
    //   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running");
  connectDB();
});
