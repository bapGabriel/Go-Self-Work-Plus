import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(
	cors({
		origin: process.env.WEB_URL,
	})
);

const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
	res.send("Go Self Work Plus");
});

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});
