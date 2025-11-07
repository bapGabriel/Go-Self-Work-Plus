import Service from "../models/service.js";

export const create = async (req, res) => {
	try {
		const { name, description, price, image } = req.body;
		const userID = req.user?.userId;

		if (!name || !description || price == null || !userID) {
			return res.status(400).json({ message: "Atributos em falta." });
		}

		const service = await Service.create({
			name,
			description,
			price,
			image,
			userID,
		});

		return res.status(201).json(service);
	} catch (error) {
		console.error("Erro criando serviço:", error);
		return res.status(500).json({ message: "Erro no servidor: ", error });
	}
};

export const read = async (req, res) => {
	try {
		const { id } = req.params;

		if (id) {
			const service = await Service.findById(id)
				.populate({
					path: "userID",
					select: "name email",
				})
				.lean();

			if (!service)
				return res.status(404).json({ message: "Serviço não encontrado." });

			return res.json({ ...service });
		}

		const services = await Service.find()
			.populate("userID", "name email")
			.sort({ createdAt: -1 })
			.lean();

		return res.json(services);
	} catch (error) {
		console.error("Erro lendo serviço(s):", error);
		return res.status(500).json({ message: "Erro no servidor: ", error });
	}
};

export const update = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, price, image } = req.body;

		const service = await Service.findById(id);
		if (!service)
			return res.status(404).json({ message: "Serviço não encontrado." });

		if (service.userID.toString() !== req.user.userId) {
			return res.status(403).json({ message: "Acesso proibido." });
		}

		service.name = name ?? service.name;
		service.description = description ?? service.description;
		service.price = price ?? service.price;
		service.image = image ?? service.image;

		await service.save();

		return res.json({ message: "Serviço atualizado com sucesso.", service });
	} catch (error) {
		console.error("Erro atualizando serviço: ", error);
		return res.status(500).json({ message: "Erro no servidor: ", error });
	}
};

export const destroy = async (req, res) => {
	try {
		const { id } = req.params;

		const service = await Service.findById(id);
		if (!service)
			return res.status(404).json({ message: "Serviço não encontrado." });

		if (service.userID.toString() !== req.user.userId) {
			return res.status(403).json({ message: "Acesso proibido." });
		}

		await service.deleteOne();

		return res.json({ message: "Serviço deletado com sucesso." });
	} catch (error) {
		console.error("Erro deletando serviço: ", error);
		return res.status(500).json({ message: "Erro no servidor: ", error });
	}
};
