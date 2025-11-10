import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthorization } from "../hooks/useAuthorization";

export default function ProtectedRoute({ roles = [] }) {
	const { user } = useAuth();
	const isAuthorized = useAuthorization(roles);

	if (!user) return <Navigate to="/login" replace />;
	if (!isAuthorized) return <Navigate to="/unauthorized" replace />;

	return <Outlet />;
}
