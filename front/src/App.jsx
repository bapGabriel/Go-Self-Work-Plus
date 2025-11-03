import React from "react";
import Home from "./views/Home";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import { Route, Routes } from "react-router-dom";
import Navbar from "./views/Navbar";
import Footer from "./views/Footer";
import { AuthProvider } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<AuthProvider>
			<Toaster position="top-right" toastOptions={{ duration: 4000 }} />
			<div className="flex flex-col">
				<Navbar />
				<div className="flex-1 bg-gray-200 min-h-screen flex flex-col justify-center items-center">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						{/* TODO: Página de erros */}
						<Route path="/unauthorized" element={"Não autorizado."} />
						<Route
							path="/admin"
							element={
								<ProtectedRoute roles={["ADMIN"]}>
									Teste autorização
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
				<Footer />
			</div>
		</AuthProvider>
	);
}

export default App;
