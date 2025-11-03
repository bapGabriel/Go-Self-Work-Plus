import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="flex items-center bg-white px-2 py-4 justify-end gap-8">
			<div className="flex gap-8">
				<Link to={"/"}>Início</Link>
				<Link>Quem somos?</Link>
				<Link>Como funciona?</Link>
			</div>
			<div className="flex gap-8">
				<Link
					className="bg-gray-100 text-gray-800 p-2 rounded-lg hover:bg-gray-300"
					to={"/login"}
				>
					Login
				</Link>
				<Link
					className="bg-gray-100 text-gray-800 p-2 rounded-lg hover:bg-gray-300"
					to={"/signup"}
				>
					Registrar
				</Link>
			</div>
		</div>
	);
}

export default Footer;
