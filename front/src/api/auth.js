import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export async function loginRequest(data) {
	const res = await axios.post(`${API_URL}/login`, data);
	return res.data;
}

export async function signupRequest(data) {
	const res = await axios.post(`${API_URL}/signup`, data);
	return res.data;
}
