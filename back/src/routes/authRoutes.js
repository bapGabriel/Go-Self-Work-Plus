import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/profile", authenticate, (req, res) => {
	res.json({ message: "Perfil do usuário", user: req.user });
});

router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
	res.json({ message: "Bem-vindo, admin!" });
});

export default router;
