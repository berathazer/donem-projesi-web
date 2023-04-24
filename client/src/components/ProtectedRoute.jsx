import React from "react";
import { Navigate } from "react-router-dom";

import { store } from "../stores";

const ProtectedRoute = ({  children }) => {
	const {user} = store.getState().user;
	if (!user.isAuthenticated) {
		return <Navigate to={"/login"} replace={true} />;
	}
	return children;
};

export default ProtectedRoute;
