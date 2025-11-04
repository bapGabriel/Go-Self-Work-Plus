import API from "../services/apiWrapper";

export async function loginRequest(data) {
	const res = await API.post(`/auth/login`, data);
	return res.data;
}

export async function signupRequest(data) {
	const res = await API.post(`/auth/signup`, data);
	return res.data;
}
