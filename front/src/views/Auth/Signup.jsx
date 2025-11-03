import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import InputText from "../../components/input/text";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputSelect from "../../components/input/select";

function Signup() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const { signup } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			await signup(data);
			toast.success("Cadastro realizado com sucesso!");
			navigate("/");
		} catch (error) {
			console.log("Erro ao registrar.", error);
			toast.error("Falha ao cadastrar!");
		}
	};

	const password = watch("password");

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-6 rounded shadow-md w-80"
			>
				<h2 className="text-xl text-bold text-center">Faça seu cadastro!</h2>
				<div className="flex flex-col gap-2">
					<InputText
						label="Nome"
						name="name"
						register={(name) =>
							register(name, { required: "Por favor informe seu nome." })
						}
						error={errors.name}
					/>
					<InputText
						label="Email"
						name="email"
						register={(name) =>
							register(name, { required: "Por favor informe seu email." })
						}
						error={errors.name}
					/>
					<InputText
						label="Senha"
						name="password"
						type="password"
						register={(name) =>
							register(name, {
								required: "Por favor preencha sua senha.",
								minLength: {
									value: 6,
									message: "A senha deve possuir pelo menos 6 caracteres.",
								},
							})
						}
						error={errors.password}
					/>

					<InputText
						label="Confirmar senha"
						name="confirmPassword"
						type="password"
						register={(name) =>
							register(name, {
								required: "Por favor confirme sua senha.",
								validate: (value) =>
									value === password || "Senhas não coincidem.",
							})
						}
						error={errors.confirmPassword}
					/>

					<InputSelect
						label="Tipo de usuário"
						name="role"
						register={(name) =>
							register(name, { required: "Informe o tipo de usuário." })
						}
						options={[
							{ value: "CLIENTE", label: "Cliente" },
							{ value: "AUTONOMO", label: "Autônomo" },
						]}
						error={errors.role}
					/>
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mt-4"
				>
					Registrar
				</button>
			</form>
		</div>
	);
}

export default Signup;
