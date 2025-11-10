import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/input/text";
import { createService } from "../../api/service";

function CreateService() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			await createService(data);
			toast.success("Anúncio criado!");
			navigate("/");
		} catch (error) {
			console.log("Erro: ", error);
			toast.error("Houve um erro ao criar o anúncio.");
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-6 rounded shadow-md w-80"
			>
				<div className="flex flex-col gap-2">
					<InputText
						label="Nome"
						name="name"
						register={(name) =>
							register(name, {
								required: "Por favor informe o título do anúncio.",
							})
						}
						error={errors.name}
					/>

					<InputText
						label="Descrição"
						name="description"
						register={(name) =>
							register(name, {
								required: "Por favor crie uma descrição para o anúncio.",
							})
						}
						error={errors.description}
					/>

					<InputText
						label="Preço"
						name="price"
						register={(name) =>
							register(name, {
								required: "Por favor informe um preço para o serviço.",
							})
						}
						error={errors.price}
					/>
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mt-4"
				>
					Criar
				</button>
			</form>
		</div>
	);
}

export default CreateService;
