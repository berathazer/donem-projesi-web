import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { faker } from "@faker-js/faker";
//import { faker } from '@faker-js/faker/locale/tr';

const columns = [
	{
		field: "id",
		headerName: "ID",
		width: 180,
		renderCell: (params) => <span className="text-gray-700 font-bold">{params.row.id}</span>,
	},
	{
		field: "firstName",
		headerName: "First name",
		width: 150,

		renderCell: (params) => (
			<span className="text-gray-500 font-semibold">{params.row.firstName}</span>
		),
	},
	{
		field: "lastName",
		headerName: "Last name",
		width: 150,
		renderCell: (params) => (
			<span className="text-gray-500 font-semibold">{params.row.lastName}</span>
		),
	},
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 110,
		renderCell: (params) => (
			<span className="text-gray-500 font-semibold">{params.row.age}</span>
		),
	},
	{
		field: "fullName",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 160,
		renderCell: (params) => (
			<span className="text-gray-500 font-semibold">{`${params.row.firstName || ""} ${
				params.row.lastName || ""
			}`}</span>
		),
		valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
	},
	{
		field: "status",
		headerName: "Status",
		description: "",
		sortable: false,
		sort:'desc',
		width: 160,
		renderCell: (params) =>
			params.row.status === 1
				? <span className="text-green-500 font-semibold bg-green-200 px-2 py-1 rounded-md">Active</span>
				: <span className="text-red-500 font-semibold bg-red-200 px-2 py-1 rounded-md">Passive</span>,
		valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
	},
];

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

const UserList = () => {
	return (
		<div className="flex flex-col p-6">
			<div className="pb-6">
				<h1 className="text-2xl font-bold text-neutral-600">Users</h1>
			</div>
			<div className="bg-slate-50">
				<Box sx={{ height: 600, width: "100%" }}>
					<DataGrid
						rows={rows}
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
		</div>
	);
};

export default UserList;
