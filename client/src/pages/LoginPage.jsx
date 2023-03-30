import React from "react";
import FormInput from "../components/Login/FormInput";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const loginHandler = ()=>{
		navigate("/dashboard")
	}

	return (
		<div className="min-w-full min-h-screen flex items-center justify-center bg-login">
			<div className="bg-white sm:w-[450px]  rounded-lg flex flex-col items-center py-10 px-10 gap-y-4">
				<div className="w-full text-center flex flex-col gap-y-2 pb-10">
					<h1 className="text-[#31507d] text-2xl font-bold">Hoşgeldiniz</h1>
					<p className="text-muted font-light">
						Hesabınıza erişmek için kimlik bilgilerinizi giriniz.
					</p>
				</div>

				<div className="w-full flex flex-col gap-y-4">
					<FormInput
						type={"text"}
						placeholder={"Mail veya kullanıcı adınızı giriniz"}
						icon={<AccountCircle color="primary" />}
					/>
					<FormInput
						type={"password"}
						placeholder={"Şifrenizi giriniz"}
						icon={<LockIcon color="primary" />}
					/>
				</div>

				<div className="pt-5 w-full">
					<Button variant="contained" onClick={loginHandler} style={{textTransform:"none"}} size="medium" color="primary" fullWidth={true}>
						Giriş Yap
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
