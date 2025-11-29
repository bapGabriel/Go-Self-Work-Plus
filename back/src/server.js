import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import serviceDetailsRoutes from "./routes/serviceDetailsRoutes.js";

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

// Rotas principais
app.use("/auth", authRoutes);
app.use("/service", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/services/details", serviceDetailsRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.send("Go Self Work Plus");
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
