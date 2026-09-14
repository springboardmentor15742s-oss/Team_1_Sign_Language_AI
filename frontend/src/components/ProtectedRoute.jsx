import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
    allowedRoles,
    children
}) {
    const { isAuthenticated, role: authRole } = useAuth();
    const location = useLocation();

    const token = localStorage.getItem("token") || (isAuthenticated ? "session-valid-token" : null);
    const role = authRole || localStorage.getItem("role") || localStorage.getItem("mira_user_role");

    // User not logged in
    if (!isAuthenticated && !token) {
        return (
            <Navigate 
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Role based protection
    if (
        allowedRoles &&
        role &&
        !allowedRoles.includes(role)
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return children;
}