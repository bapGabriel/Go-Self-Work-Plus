import express from "express";
import * as serviceController from "../controllers/serviceController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, serviceController.create);
router.get("/", serviceController.read);
router.get("/:id", serviceController.read);
router.put("/:id", authenticate, serviceController.update);
router.delete("/:id", authenticate, serviceController.destroy);

export default router;
