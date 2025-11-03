import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, signupRequest } from "../api/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("token"));

	useEffect(() => {
		if (token) {
			const storedUser = JSON.parse(localStorage.getItem("user"));
			setUser(storedUser);
		}
	}, [token]);

	const login = async (data) => {
		const res = await loginRequest(data);
		setToken(res.token);
		localStorage.setItem("token", res.token);
		localStorage.setItem("user", JSON.stringify(res.user));
		setUser(res.user);
	};

	const signup = async (data) => {
		const res = await signupRequest(data);
		setToken(res.token);
		localStorage.setItem("token", res.token);
		localStorage.setItem("user", JSON.stringify(res.user));
		setUser(res.user);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.clear();
	};

	return (
		<AuthContext.Provider value={{ user, token, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
