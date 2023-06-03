import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { faker } from "@faker-js/faker";
//import { faker } from '@faker-js/faker/locale/tr';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import toast from "react-hot-toast";

/*
const rows = [
	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},

	{
		id: faker.datatype.number({ min: 1, max: 999999999 }),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		age: faker.datatype.number({ min: 18, max: 70 }),
		status: faker.datatype.number({ min: 0, max: 1 }),
	},
];
*/

const BASE_URL = "http://localhost:8000/api";

const UserList = () => {
	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 250,
			renderCell: (params) => (
				<span className="text-gray-700 font-bold">{params.row.id}</span>
			),
		},
		{
			field: "firstName",
			headerName: "First name",
			width: 150,

			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.firstName}
				</span>
			),
		},
		{
			field: "lastName",
			headerName: "Last name",
			width: 150,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.lastName}
				</span>
			),
		},
		{
			field: "plate",
			headerName: "Plate",
			width: 110,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.plate}
				</span>
			),
		},
		{
			field: "status",
			headerName: "Status",
			description: "",
			sortable: false,
			sort: "desc",
			width: 120,
			renderCell: (params) =>
				params.row.status === 1 ? (
					<span className="text-green-500 w-20 text-center font-semibold bg-green-200 px-2 py-1 rounded-md">
						Active
					</span>
				) : (
					<span className="text-red-500 w-20 text-center font-semibold bg-red-200 px-2 py-1 rounded-md">
						Passive
					</span>
				),
			valueGetter: (params) =>
				`${params.row.firstName || ""} ${params.row.lastName || ""}`,
		},
		{
			field: "edit",
			headerName: "Edit",
			description: "",
			sortable: false,
			sort: "desc",
			width: 250,
			renderCell: (params) => (
				<div className="flex items-center gap-x-4" id={params.id}>
					<Button
						style={{ width: 100, padding: 5 }}
						color="success"
						variant="contained"
						startIcon={<VisibilityIcon />}
						onClick={handleEdit}
					>
						Show
					</Button>
					<Button
						style={{ width: 100, padding: 5 }}
						color="error"
						variant="contained"
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
					>
						Delete
					</Button>
				</div>
			),
		},
	];

	const [users, setUsers] = useState([]);
	const apiKey = "29b068e5f73f77da112c8aa6435993bb";
	const [modal, setModal] = useState(false);

	const navigate = useNavigate();

	const handleEdit = (e) => {
		const customerId = e.target.parentElement.id;
		console.log(customerId);
		navigate(customerId, { replace: true });
	};

	const handleDelete = async (e) => {
		const customerId = e.target.parentElement.id;
		try {
			console.log("delete", customerId);

			if (customerId != "") {
				const token = localStorage.getItem("token");

				const response = await axios.post(
					BASE_URL + "/customers/delete",
					{
						customerId: customerId,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.data.success) {
					toast.success("Müşteri Başarıyla Silindi");
					setUsers((prev)=>{
						return prev.filter(user=> user.id !== customerId);
					})
					
					setModal(!modal);
				}else{
					return toast.error(response.data?.message);
				}
			}
		} catch (error) {
			toast.error(error.message);
			console.error("Silme işlemi sırasında bir hata oluştu:", error);
		}
	};

	useEffect(() => {
		const getAllUser = async () => {
			try {
				const response = await axios.get(
					BASE_URL + "/customers?api_key=" + apiKey
				);
				if (response.data.success) {
					const customers = response.data.customers;
					let tempCustomers = [];
					customers.forEach((customer) => {
						tempCustomers.push({
							id: customer._id,
							lastName: customer.fullName.split(" ")[1],
							firstName: customer.fullName.split(" ")[0],
							plate: customer.plate,
							status: customer.customer_status,
						});
					});
					console.log(tempCustomers);
					setUsers([...tempCustomers]);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getAllUser();
	}, []);

	return (
		<div className="flex flex-col p-6">
			<div className="pb-6">
				<h1 className="text-2xl font-bold text-neutral-600">Users</h1>
			</div>
			{users.length === 0 ? (
				<div className="font-bold text-muted">Loading...</div>
			) : (
				<div className="bg-slate-50">
					<Box sx={{ height: 600, width: "100%" }}>
						<DataGrid
							rows={users}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 10,
									},
								},
							}}
							autoPageSize={true}
							pageSizeOptions={[5]}
							checkboxSelection
							disableRowSelectionOnClick
						/>
					</Box>
				</div>
			)}
		</div>
	);
};

export default UserList;
