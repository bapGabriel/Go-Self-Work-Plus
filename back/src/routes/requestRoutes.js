import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isClient } from "../middlewares/roleMiddleware.js";
import { createRequest } from "../controllers/requestcontroller.js";

const router = express.Router();

router.post("/", authenticate, isClient, createRequest);

export default router;
