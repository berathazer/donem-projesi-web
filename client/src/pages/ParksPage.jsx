import React, { useState, useEffect } from "react";
import SideBar from "../components/Home/SideBar";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import toast from "react-hot-toast";

import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Tooltip } from "@mui/material";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";



const ParksPage = () => {
	const [parks, setParks] = useState([]);

	const columns = [
		{
			field: "tckn",
			headerName: "TCKN",
			width: 120,
			renderCell: (params) => (
				<span className="text-gray-700 font-bold">
					{params.row.customer_id?.TCKN}
				</span>
			),
		},
		{
			field: "fullName",
			headerName: "Full name",
			width: 150,

			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.customer_id?.fullName}
				</span>
			),
		},

		{
			field: "plate",
			headerName: "Plate",
			width: 110,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.customer_plate}
				</span>
			),
		},

		{
			field: "receiptFee",
			headerName: "Receipt Amount",
			description: "",
			sortable: false,
			sort: "desc",
			width: 120,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.park_state
						? "0"
						: Math.round(params.row.receipt_id?.receipt_fee)}
				</span>
			),
		},

		{
			field: "entry_date",
			headerName: "Entry Date",
			description: "",
			sortable: false,
			sort: "desc",
			width: 200,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{new Date(params.row.entry_time).toLocaleString("tr-TR", {
						timeZone: "Europe/Istanbul",
					})}
				</span>
			),
		},
		{
			field: "status",
			headerName: "Park Status",
			description: "",
			sortable: false,
			sort: "desc",
			width: 120,
			renderCell: (params) =>
				params.row.park_state === 1 ? (
					<span className="text-green-500 w-20 text-center font-semibold bg-green-200 px-2 py-1 rounded-md">
						Active
					</span>
				) : (
					<span className="text-red-500 w-20 text-center font-semibold bg-red-200 px-2 py-1 rounded-md">
						Passive
					</span>
				),
		},
	];

	const exportTable = (e) => {
		
		const pdfArray = [];
		const doc = new jsPDF();
		
		parks.forEach(park => {
			console.log(park);
			let TCKN = park.customer_id.TCKN;
			let fullName = park.customer_id.fullName;
			let plate = park.customer_plate;
			let receipt = park.park_state ?  "0" : park.receipt_id?.receipt_fee ;
			let entry_date = new Date(park.entry_time).toLocaleString("tr-TR", {
				timeZone: "Europe/Istanbul",
			});
			console.log();
			let park_status = park.park_state ? "Active" : "Passive";

			pdfArray.push([TCKN,fullName,plate,receipt,entry_date,park_status]);
		});

		autoTable(doc, {
			theme:"grid",
			styles:{cellPadding:{vertical:4,horizontal:2}},
			head: [
				[
					"TCKN",
					"Fullname",
					"Plate",
					"Receipt Amount",
					"Entry Date",
					"Park Status",
				],
			],
			body: pdfArray,
		});

		const currentDate = new Date();
		doc.save(
			"Parks." +
				currentDate
					.toLocaleString("tr-TR")
					.replaceAll(" ", "_")
					.replaceAll(":", ".") +
				".pdf"
		);
		toast.success("Pdf Başarıyla Kaydedildi.")
	};

	useEffect(() => {
		const fetchParks = async () => {
			const response = await axios.get(BASE_URL + "/parks/?api_key=" + apiKey);
			if (response.data.success) {
				setParks([...response.data.allParks]);
			} else {
				console.log("fail:", response.data);
			}
		};
		fetchParks();
	}, []);
	return (
		<div className="min-w-full min-h-screen flex  bg-login">
			<div className="flex-2 flex-col  relative  bg-white">
				<SideBar />
			</div>
			<div className="flex-8 flex flex-col bg-blue-50">
				<div className="flex flex-col flex-wrap gap-2 p-6">
					<div className=" flex justify-between items-center pr-6">
						<h1 className="text-2xl font-bold text-neutral-600">
							Parks
						</h1>
						<Tooltip placement="left" title="Export Table">
							<IconButton
								
								size="large"
								aria-label="fingerprint"
								color="error"
								onClick={exportTable}
							>
								<PictureAsPdfIcon style={{ fontSize: 40 }}/>
							</IconButton>
						</Tooltip>
					</div>

					{parks.length === 0 ? (
						<div className="font-bold text-muted">
							Loading...
						</div>
					) : (
						<div className="bg-slate-50">
							<Box sx={{ height: 600, width: "100%" }}>
								<DataGrid
									id="dataGrid"
									rows={parks}
									columns={columns}
									getRowId={(row) => row._id}
									initialState={{
										pagination: {
											paginationModel:
												{
													pageSize: 10,
												},
										},
									}}
									autoPageSize={true}
									pageSizeOptions={[5]}
									checkboxSelection
									disableRowSelectionOnClick
								/>
							</Box>{" "}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ParksPage;
