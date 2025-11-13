import React, { useEffect, useState } from "react";
import { getService } from "../../api/service";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

function ManageServices() {
	const [services, setServices] = useState();
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	console.log(user);

	useEffect(() => {
		if (!user) return;

		const fetchServices = async () => {
			try {
				const res = await getService({ user: user.id });
				setServices(res || []);
			} catch (error) {
				console.error(error);
				toast.error("Erro ao carregar anúncios.");
			} finally {
				setLoading(false);
			}
		};

		fetchServices();
	}, [user]);

	return (
		<div className="flex gap-4">
			{loading && <div>Carregando...</div>}
			{services &&
				services.map((service) => (
					<div className="p-4 bg-white aspect-square flex flex-col rounded-xl">
						{/* TODO: Sistema de avaliação */}
						<div>⭐⭐⭐⭐⭐</div>
						<span className="font-bold text-2xl">{service.name}</span>
						<span className="text-sm">{service.description}</span>
						<span className="text-sm">R${service.price}</span>
						<div className="flex gap-1 mt-2">
							<button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 mt-4">
								Alterar
							</button>
							<button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 mt-4">
								Apagar
							</button>
						</div>
					</div>
				))}
		</div>
	);
}

export default ManageServices;
