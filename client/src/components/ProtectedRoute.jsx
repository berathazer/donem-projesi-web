import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ isAuthenticated = true, children }) => {
	if (!isAuthenticated) {
		return <Navigate to={"/login"} replace={true} />;
	}
	return children;
};

export default ProtectedRoute;
