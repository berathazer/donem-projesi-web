import React from "react";
import { Navigate } from "react-router-dom";
import { actions as userActions } from "../stores/user-store";
import { useDispatch } from "react-redux";
const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");

	if (token) {
		dispatch(userActions.loginUser({ token }));
		return children;
	} else {
		return <Navigate to={"/login"} replace={true} />;
	}
};

export default ProtectedRoute;
