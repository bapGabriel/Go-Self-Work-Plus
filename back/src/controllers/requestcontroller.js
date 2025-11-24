import Request from "../models/request.js";

export const createRequest = async (req, res) => {
	try {
		const { description, suggestedValue } = req.body;

		// 🔥 AQUI USAMOS req.user.userId (sem alterar seu middleware)
		const clientId = req.user.userId;

		if (!description || !suggestedValue) {
			return res.status(400).json({ message: "Dados incompletos." });
		}

		const request = await Request.create({
			clientId,
			description,
			suggestedValue,
		});

		res.status(201).json({
			message: "Solicitação criada com sucesso!",
			request,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erro no servidor." });
	}
};
