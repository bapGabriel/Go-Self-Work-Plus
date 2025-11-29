import Service from "../models/service.js";

export const postCompletedWork = async (req, res) => {
	try {
		const { id } = req.params; 
		const { description, photos } = req.body;

		// Procurar o serviço
		const service = await Service.findById(id);

		if (!service) {
			return res.status(404).json({ message: "Serviço não encontrado" });
		}

		// Verifica se o user logado é o dono do serviço
		if (service.userID.toString() !== req.user.id) {
			return res.status(403).json({ message: "Acesso negado" });
		}

		// Atualiza o campo completedWork
		service.completedWork = {
			description,
			photos,
			postedAt: new Date()
		};

		await service.save();

		res.status(200).json({
			message: "Trabalho finalizado registrado com sucesso!",
			service
		});
	} catch (error) {
		res.status(500).json({ message: "Erro interno", error });
	}
};

export const getServiceDetails = async (req, res) => {
	try {
		const { id } = req.params;

		const service = await Service.findById(id).populate("userID", "name email");

		if (!service) {
			return res.status(404).json({ message: "Serviço não encontrado" });
		}

		res.status(200).json(service);
	} catch (error) {
		res.status(500).json({ message: "Erro interno", error });
	}
};
