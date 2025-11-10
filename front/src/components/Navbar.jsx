import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
	const { user, logout } = useAuth();

	return (
		<div className="flex items-center bg-white px-2 py-4 justify-end gap-8">
			<div className="flex gap-8">
				<Link to={"/"}>Início</Link>
				<Link>Quem somos?</Link>
				<Link>Como funciona?</Link>
			</div>

			<div className="flex gap-4">
				{user ? (
					<>
						{user.role == "AUTONOMO" && (
							<div className="flex gap-4 items-center">
								<Link to={"/autonomous/services"}>Ver meus anúncios</Link>
								<Link to={"/autonomous/services/create"}>Criar anúncio</Link>
							</div>
						)}

						{user.role == "CLIENTE" && (
							<div className="flex gap-4 items-center">
								<Link>Ver minhas solicitações</Link>
								<Link>Criar solicitação</Link>
							</div>
						)}

						<button
							onClick={logout}
							className="bg-blue-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-700"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							className="bg-blue-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-700"
							to={"/login"}
						>
							Login
						</Link>
						<Link
							className="bg-blue-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-700"
							to={"/signup"}
						>
							Registrar
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
