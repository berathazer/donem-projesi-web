import React, { useEffect, useState } from "react";
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

const ReceiptsPage = () => {
	const columns = [
		{
			field: "tckn",
			headerName: "TCKN",
			width: 120,
			renderCell: (params) => (
				<span className="text-gray-700 font-bold">
					{params.row.receipt_customer_id?.TCKN}
				</span>
			),
		},
		{
			field: "fullName",
			headerName: "Full name",
			width: 150,

			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.receipt_customer_id?.fullName}
				</span>
			),
		},

		{
			field: "plate",
			headerName: "Plate",
			width: 110,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.receipt_customer_id.plate}
				</span>
			),
		},

		{
			field: "receiptFee",
			headerName: "Amount",
			description: "",
			sortable: false,
			sort: "desc",
			width: 120,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{params.row.park_state
						? "0"
						: Math.round(params.row.receipt_fee)}
				</span>
			),
		},

		{
			field: "entry_date",
			headerName: "Entry Date",
			description: "",
			sortable: false,
			sort: "desc",
			width: 150,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{new Date(
						params.row.receipt_park_id.entry_time
					).toLocaleString("tr-TR", {
						timeZone: "Europe/Istanbul",
					})}
				</span>
			),
		},

		{
			field: "exit_date",
			headerName: "Exit Date",
			description: "",
			sortable: false,
			sort: "desc",
			width: 150,
			renderCell: (params) => (
				<span className="text-gray-500 font-semibold">
					{new Date(
						params.row.receipt_park_id.exit_time
					).toLocaleString("tr-TR", {
						timeZone: "Europe/Istanbul",
					})}
				</span>
			),
		},
		{
			field: "status",
			headerName: "Receipt Status",
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

	const [receipts, setReceipts] = useState([]);

	useEffect(() => {
		const fetchReceipts = async () => {
			try {
				const response = await axios.get(
					BASE_URL + "/receipts/?api_key=" + apiKey
				);

				if (response.data.success) {
					setReceipts([...response.data.allReceipts]);
				} else {
					console.log("fail:", response.data);
				}
			} catch (error) {
				toast.error(error.message);
			}
		};
		fetchReceipts();
	}, []);

	const exportTable = (e) => {
		try {
			const pdfArray = [];
			const doc = new jsPDF();

			receipts.forEach((receipt) => {
			

				let TCKN = receipt.receipt_customer_id.TCKN;
				let fullName = receipt.receipt_customer_id.fullName;
				let plate = receipt.receipt_customer_id.plate;
				let receipt_fee = receipt.receipt_fee;
				let entry_date = new Date(receipt.receipt_park_id.entry_time).toLocaleString("tr-TR", {
					timeZone: "Europe/Istanbul",
				});
				let exit_date = new Date(receipt.receipt_park_id.exit_time).toLocaleString("tr-TR", {
					timeZone: "Europe/Istanbul",
				});
				let receipt_status = receipt.recept_state ? "Active" : "Passive";

				pdfArray.push([
					TCKN,
					fullName,
					plate,
					receipt_fee,
					entry_date,
					exit_date,
					receipt_status
				]);
			});

			autoTable(doc, {
				theme: "grid",
				styles: { cellPadding: { vertical: 4, horizontal: 2 } },
				head: [
					[
						"TCKN",
						"Fullname",
						"Plate",
						"Amount",
						"Entry Date",
						"Exit Date",
						"Park Status"
					],
				],
				body: pdfArray,
			});

			const currentDate = new Date();
			doc.save(
				"Receipts." +
					currentDate
						.toLocaleString("tr-TR")
						.replaceAll(" ", "_")
						.replaceAll(":", ".") +
					".pdf"
			);
			toast.success("Pdf Başarıyla Kaydedildi.");
		} catch (error) {
			return toast.error(error.message);
		}
	};

	return (
		<div className="min-w-full min-h-screen flex  bg-login">
			<div className="flex-2 flex-col  relative  bg-white">
				<SideBar />
			</div>
			<div className="flex-8 flex flex-col bg-blue-50">
				<div className="flex flex-col flex-wrap gap-2 p-6">
					<div className=" flex justify-between items-center pr-6">
						<h1 className="text-2xl font-bold text-neutral-600">
							Receipts
						</h1>
						<Tooltip placement="left" title="Export Table">
							<IconButton
								size="large"
								aria-label="fingerprint"
								color="error"
								onClick={exportTable}
							>
								<PictureAsPdfIcon
									style={{ fontSize: 40 }}
								/>
							</IconButton>
						</Tooltip>
					</div>

					{receipts.length === 0 ? (
						<div className="font-bold text-muted">
							Loading...
						</div>
					) : (
						<div className="bg-slate-50">
							<Box sx={{ height: 600, width: "100%" }}>
								<DataGrid
									rows={receipts}
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
							</Box>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReceiptsPage;
