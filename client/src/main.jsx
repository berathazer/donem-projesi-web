import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./stores";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import SingleUserPage from "./pages/SingleUserPage";
import EditUserPage from "./pages/EditUserPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import ParksPage from "./pages/ParksPage";


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
				path: ":customerId",
				element: (
					<ProtectedRoute>
						<SingleUserPage />
					</ProtectedRoute>
				),
			},
			{
				path: "edit/:customerId",
				element: (
					<ProtectedRoute>
						<EditUserPage />
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
		path:"/parks",
		element: <ParksPage />,
	},
	{
		path:"/receipts",
		element: <ReceiptsPage />,
	},
	{
		path: "*", // custom 404 route
		element: <div>404</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Provider store={store}>
			<Toaster />
			<RouterProvider router={router} />
		</Provider>
	</>
);

/* ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Toaster/>
		<RouterProvider router={router} />
	</React.StrictMode>
);
 */
