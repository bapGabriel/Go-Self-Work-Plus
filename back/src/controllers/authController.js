import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../services/jwtService.js";

export const signup = async (req, res) => {
	const { name, email, password, role } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "Usuário já existe!" });

		if (role !== "CLIENTE" || role !== "AUTONOMO") {
			return res
				.status(400)
				.json({ message: "Tipo de usuário especificado inválido! " });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role,
		});

		const token = generateToken({ userId: user._id, role: user.role });

		res.status(201).json({
			message: "Usuário criado com sucesso!",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erro no servidor." });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Usuário não encontrado." });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(401).json({ message: "Senha incorreta." });

		const token = generateToken({ userId: user._id, role: user.role });

		res.json({
			message: "Login bem-sucedido!",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erro no servidor." });
	}
};
