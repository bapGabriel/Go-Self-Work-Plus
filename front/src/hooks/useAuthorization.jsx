import { useAuth } from "./useAuth";

export function useAuthorization(allowedRoles = []) {
	const { user } = useAuth();
	if (!user) return false;
	if (allowedRoles.length === 0) return true;
	return allowedRoles.includes(user.role);
}
