import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import { TextField } from "@mui/material";

import Button from "@mui/material/Button";
import axios from "axios";

import { Card, Icon, Image } from "semantic-ui-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";

const AddNewUser = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		TCKN: "",
		email: "",
		phone: "",
		plate: "",
	});
	const navigate = useNavigate();
	const clickHandler = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(BASE_URL + "/customers/new", formData, {
				headers: { Authorization: "Bearer " + token },
			});

			if (response.data.success) {
				
				toast.success(response.data.message);
				return navigate("/users",{replace: true});
			}
			return toast.error(response.data.error);
		} catch (error) {
			return toast.error(error.message);
		}
	};
	return (
		<div className="flex flex-col p-6">
			<div className="pb-6">
				<h1 className="text-2xl font-bold text-neutral-600">
					Add New User
				</h1>
			</div>
			<div className="bg-white p-6 rounded-md ">
				<Grid container>
					<Grid item xs={12} sm={12} md={6} lg={4}>
						<Card>
							<Image
								src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
								wrapped
								ui={false}
							/>
							<Card.Content className="flex flex-col gap-y-2">
								<Card.Header>
									{formData.fullName}
								</Card.Header>
								<Card.Meta className="flex gap-x-2 text-xl font-semibold">
									<Icon
										name="phone"
										size="large"
									></Icon>
									{formData.phone}
								</Card.Meta>
								<Card.Meta className="flex gap-x-2 text-xl font-semibold">
									<Icon
										name="id badge"
										size="large"
									></Icon>
									{formData.TCKN}
								</Card.Meta>
								<Card.Meta className="flex gap-x-2 text-xl font-semibold">
									<Icon
										name="mail"
										size="large"
									></Icon>
									{formData.email}
								</Card.Meta>
								<Card.Meta className="flex gap-x-2 text-xl font-semibold">
									<Icon
										name="tags"
										size="large"
									></Icon>
									{formData.plate}
								</Card.Meta>
							</Card.Content>
							<Card.Content extra>
								<a>
									<Icon name="calendar" />
									{new Date().toLocaleString()}
								</a>
							</Card.Content>
						</Card>
					</Grid>
					<Grid item container xs={12} sm={12} md={6} lg={8}>
						<Grid item xs={6}>
							<div className="flex flex-col gap-y-5">
								<div className="flex items-center justify-center">
									<TextField
										color="primary"
										id="outlined-basic"
										label="Full Name"
										placeholder="John Doe"
										variant="outlined"
										type={"text"}
										value={
											formData.fullName
										}
										onChange={(e) => {
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
										variant="outlined"
										type={"text"}
										value={
											formData.phone
										}
										onChange={(e) => {
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
										placeholder="34AA555"
										variant="outlined"
										type={"text"}
										value={
											formData.plate
										}
										onChange={(e) => {
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
										placeholder="1255584578"
										variant="outlined"
										type={"text"}
										value={
											formData.TCKN
										}
										onChange={(e) => {
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
										variant="outlined"
										type={"email"}
										value={
											formData.email
										}
										onChange={(e) => {
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
								{/*
								<div className="flex items-center justify-center">
									<TextField
										color="primary"
										id="outlined-basic"
										label="Image"
										placeholder="Turkey"
										variant="outlined"
										type={"text"}
									/>
								</div>
								*/}
							</div>
						</Grid>
						<Grid item xs={12} justifyContent={"center"}>
							<div className=" pt-6 lg:mx-16">
								<Button
									onClick={clickHandler}
									variant="contained"
									color="primary"
									fullWidth={true}
								>
									Add
								</Button>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AddNewUser;
