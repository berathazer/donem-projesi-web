import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import SideBar from "../components/Home/SideBar";

import { TextField } from "@mui/material";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Switch from "@mui/material/Switch";

import { Card, Icon } from "semantic-ui-react";
import { toast } from "react-hot-toast";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";

const EditUserPage = () => {
	const { customerId } = useParams();
	const [customer, setCustomer] = useState(null);

	const [formData, setFormData] = useState({
		fullName: "",
		TCKN: "",
		email: "",
		phone: "",
		plate: "",
		customer_status: null,
	});

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(
				BASE_URL +
					"/customers/find-by-id?api_key=" +
					apiKey +
					"&id=" +
					customerId
			);

			if (response.data.success) {
				setCustomer({ ...response.data.customer });
				setFormData({ ...response.data.customer });
			}
		};
		fetchUser();
	}, []);

	const clickHandler = async () => {
		try {
			const token = localStorage.getItem("token");

			const response = await axios.post(
				BASE_URL + "/customers/update",
				formData,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				return setFormData({ ...response.data.customer });
			}
			toast.error(response.data.error);
		} catch (error) {
			return toast.error(error.message);
		}
	};

	return (
		<div className="min-w-full min-h-screen flex  bg-login">
			<div className="flex-2 flex-col relative  bg-white">
				<SideBar />
			</div>
			<div className="flex-8 flex flex-col bg-blue-50">
				<div className="flex flex-col p-6">
					<div className="pb-6">
						<h1 className="text-2xl font-bold text-neutral-600">
							Edit : {customerId}
						</h1>
					</div>
					<div className="bg-white p-6 rounded-md ">
						<Grid container>
							<Grid item xs={12} sm={12} md={6} lg={4}>
								<Card
									className=""
									image="https://react.semantic-ui.com/images/avatar/large/matthew.png"
									header={customer?.fullName}
									fluid={false}
									color="teal"
									meta="Müşteri"
									extra={
										<a>
											<Icon name="calendar alternate" />
											{
												customer?.createdAt
											}
										</a>
									}
								/>
							</Grid>
							<Grid
								item
								container
								xs={12}
								sm={12}
								md={6}
								lg={8}
							>
								<Grid item xs={6}>
									<div className="flex flex-col gap-y-5">
										<div className="flex items-center justify-center">
											<TextField
												color="primary"
												id="outlined-basic"
												label="Full Name"
												placeholder={
													"John Doe"
												}
												variant="filled"
												type={
													"text"
												}
												value={
													formData?.fullName
												}
												onChange={(
													e
												) => {
													setFormData(
														{
															...formData,
															fullName: e
																.target
																.value,
														}
													);
												}}
											/>
										</div>
										<div className="flex items-center justify-center">
											<TextField
												color="primary"
												id="outlined-basic"
												label="Phone"
												placeholder="551 756 65 57"
												variant="filled"
												type={
													"text"
												}
												value={
													formData?.phone
												}
												onChange={(
													e
												) => {
													setFormData(
														{
															...formData,
															phone: e
																.target
																.value,
														}
													);
												}}
											/>
										</div>
										<div className="flex items-center justify-center">
											<TextField
												color="primary"
												id="outlined-basic"
												label="Plate"
												placeholder="Manhattan St."
												variant="filled"
												type={
													"text"
												}
												value={
													formData?.plate
												}
												onChange={(
													e
												) => {
													setFormData(
														{
															...formData,
															plate: e
																.target
																.value,
														}
													);
												}}
											/>
										</div>
									</div>
								</Grid>
								<Grid item xs={6}>
									<div className="flex flex-col gap-y-5">
										<div className="flex items-center justify-center">
											<TextField
												color="primary"
												id="outlined-basic"
												label="TCKN"
												placeholder="36658455478"
												variant="filled"
												type={
													"text"
												}
												value={
													formData?.TCKN
												}
												onChange={(
													e
												) => {
													setFormData(
														{
															...formData,
															TCKN: e
																.target
																.value,
														}
													);
												}}
											/>
										</div>
										<div className="flex items-center justify-center">
											<TextField
												color="primary"
												id="outlined-basic"
												label="Email"
												placeholder="example@gmail.com"
												variant="filled"
												type={
													"email"
												}
												value={
													formData?.email
												}
												onChange={(
													e
												) => {
													setFormData(
														{
															...formData,
															email: e
																.target
																.value,
														}
													);
												}}
											/>
										</div>
										<div className="flex flex-col  justify-center relative left-24">
											<span className="text-xl font-semibold">
												Status
											</span>
											<div>
												<Switch
													checked={
														formData.customer_status
															? true
															: false
													}
													color="success"
													onChange={(
														e
													) => {
														if (
															formData.customer_status ==
															1
														) {
															setFormData(
																{
																	...formData,
																	customer_status: 0,
																}
															);
														} else {
															setFormData(
																{
																	...formData,
																	customer_status: 1,
																}
															);
														}
													}}
												/>

												<span>
													{formData?.customer_status
														? "Active"
														: "Passive"}
												</span>
											</div>
										</div>
									</div>
								</Grid>
								<Grid
									item
									xs={12}
									justifyContent={"center"}
								>
									<div className=" pt-6 lg:mx-16">
										<Button
											variant="contained"
											color="primary"
											fullWidth={
												true
											}
											onClick={
												clickHandler
											}
										>
											Update
											Customer
										</Button>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditUserPage;
