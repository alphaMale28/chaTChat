import express from "express";
import "dotenv/config";
import path from "path";

import authRouters from "./routes/auth.route.js";
import messageRouters from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT;

app.use(express.json()); // req.body

app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
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
