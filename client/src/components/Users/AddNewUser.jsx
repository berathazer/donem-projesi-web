import React from "react";
import Grid from "@mui/material/Grid";

import { TextField } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
const AddNewUser = () => {
	return (
		<div className="flex flex-col p-6">
			<div className="pb-6">
				<h1 className="text-2xl font-bold text-neutral-600">Add New User</h1>
			</div>
			<div className="bg-white p-6 rounded-md ">
				<Grid container>
					<Grid item xs={12} sm={12} md={6} lg={4}>
						<div className="flex flex-col items-center ">
							<div
								className="w-32 h-32 rounded-full bg-yellow-600 text-white 
                                flex items-center justify-center text-3xl"
							>
								BH
							</div>
						</div>
					</Grid>
					<Grid container xs={12} sm={12} md={6} lg={8}>
						<Grid xs={6}>
							<div className="flex flex-col gap-y-5">
								<div className="flex items-center justify-center">
									<TextField
										color="primary"
										id="outlined-basic"
										label="Name and surname"
										placeholder="John Doe"
										variant="outlined"
										type={"text"}
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
									/>
								</div>
								<div className="flex items-center justify-center">
									<TextField
										color="primary"
										id="outlined-basic"
										label="Address"
										placeholder="Manhattan St."
										variant="outlined"
										type={"text"}
									/>
								</div>
							</div>
						</Grid>
						<Grid xs={6}>
							<div className="flex flex-col gap-y-5">
								<div className="flex items-center justify-center">
									<TextField
										color="primary"
										id="outlined-basic"
										label="Username"
										placeholder="johnx18"
										variant="outlined"
										type={"text"}
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
									/>
								</div>
								<div className="flex items-center justify-center">
									<TextField
										color="primary"
										id="outlined-basic"
										label="Country"
										placeholder="Turkey"
										variant="outlined"
										type={"text"}
									/>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} justifyContent={"center"}>
							<div className=" pt-6 lg:mx-16">
								<Button variant="contained" color="primary" fullWidth={true}>Add</Button>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AddNewUser;
