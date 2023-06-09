import React, { useState } from "react";
import FormInput from "../components/Login/FormInput";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

import { actions } from "../stores/user-store";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const loginHandler = async () => {
		try {
			const response = await axios.post(BASE_URL + "/users/login", formData);
			if (response.data.success) {
				const token = response.data.token;
				localStorage.setItem("fullName", response.data.fullName);
				//tokeni isteklerde kullanmak için localStorage'a salladık
				localStorage.setItem("token", token);

				//user stateini oluşturduk artık user authenticate oldu
				dispatch(actions.loginUser({ token: token }));

				toast.success("Login Success");

				//authenticate olan useri /dashboard sayfasına yolladım.
				navigate("/dashboard");
			} else {
				return toast.error(response.data?.message || response.data?.error);
			}
		} catch (error) {
			return toast.error(error.message)
		}
	};

	if (localStorage.getItem("token")) {
		toast.error("You have already logged in", { duration: 2000 });
		return <Navigate to="/dashboard" replace={true} />;
	}
	return (
		<div className="min-w-full min-h-screen flex items-center justify-center bg-login">
			<div className="bg-white sm:w-[450px]  rounded-lg flex flex-col items-center py-10 px-10 gap-y-4">
				<div className="w-full text-center flex flex-col gap-y-2 pb-10">
					<h1 className="text-[#31507d] text-2xl font-bold">
						Hoşgeldiniz
					</h1>
					<p className="text-muted font-light">
						Hesabınıza erişmek için kimlik bilgilerinizi
						giriniz.
					</p>
				</div>

				<div className="w-full flex flex-col gap-y-4">
					<FormInput
						formData={formData}
						setFormData={setFormData}
						type={"text"}
						placeholder={"Mail veya kullanıcı adınızı giriniz"}
						icon={<AccountCircle color="primary" />}
					/>
					<FormInput
						formData={formData}
						setFormData={setFormData}
						type={"password"}
						placeholder={"Şifrenizi giriniz"}
						icon={<LockIcon color="primary" />}
					/>
				</div>

				<div className="pt-5 w-full">
					<Button
						variant="contained"
						onClick={loginHandler}
						style={{ textTransform: "none" }}
						size="medium"
						color="primary"
						fullWidth={true}
					>
						Giriş Yap
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
