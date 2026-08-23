import { Navigate } from "react-router-dom";


export default function ProtectedRoute({
    allowedRoles,
    children
}) {


    const token =
        localStorage.getItem("token");


    const role =
        localStorage.getItem("role");



    // User not logged in

    if (!token) {

        return (
            <Navigate 
                to="/login"
                replace
            />
        );

    }



    // Role based protection

    if (
        allowedRoles &&
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