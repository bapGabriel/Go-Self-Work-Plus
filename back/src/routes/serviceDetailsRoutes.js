import express from "express";
import { postCompletedWork, getServiceDetails } from "../controllers/serviceDetailsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ver detalhes completos de um serviço
router.get("/:id", authenticate, getServiceDetails);

// Postar trabalho concluído
router.post("/:id/completed", authenticate, postCompletedWork);

export default router;
