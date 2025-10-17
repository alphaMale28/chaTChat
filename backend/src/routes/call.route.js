import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/:id", callUser);

export default routers;
