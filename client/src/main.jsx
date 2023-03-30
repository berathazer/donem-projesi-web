import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import SingleUserPage from "./pages/SingleUserPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<HomePage />
			</ProtectedRoute>
		),

		children: [
			{
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: "/users",
		children: [
			{
				path: "",
				element: (
					<ProtectedRoute>
						<UsersPage />
					</ProtectedRoute>
				),
				index: true,
			},
			{
				path: "new-user",
				element: (
					<ProtectedRoute>
						<AddUserPage />
					</ProtectedRoute>
				),
			},
			{
				path: ":userId",
				element: (
					<ProtectedRoute>
						<SingleUserPage />
					</ProtectedRoute>
				),
			},
		],
	},

	{
		path: "/login",
		element: <LoginPage />,
	},

	{
		path: "*", // custom 404 route
		element: <div>404</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Toaster />
		<RouterProvider router={router} />
	</>
);

/* ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Toaster/>
		<RouterProvider router={router} />
	</React.StrictMode>
);
 */
