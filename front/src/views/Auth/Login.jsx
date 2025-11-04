import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputText from "../../components/input/text";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { login } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			await login(data);
			toast.success("Seja bem-vindo!");
			navigate("/");
		} catch (error) {
			console.log("Erro ao logar.", error);
			toast.error("Erro ao logar!");
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-6 rounded shadow-md w-80"
			>
				<h2 className="text-xl text-bold text-center">Entrar</h2>
				<div className="flex flex-col gap-2">
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
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mt-4"
				>
					Login
				</button>

				<Link to={"/forgot-password"} className="text-gray-600">
					Esqueceu sua senha?
				</Link>
			</form>
		</div>
	);
}

export default Login;
