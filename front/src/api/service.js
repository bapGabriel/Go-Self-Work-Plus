import API from "../services/apiWrapper";

export async function getService({ id, user } = {}) {
	const path = id ? `service/${id}` : "service";
	const query = user ? `?user=${user}` : "";
	const res = await API.get(`${path}${query}`);
	return res.data;
}

export async function createService(data) {
	const res = await API.post(`service`, data);
	return res.data;
}
