import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import Grid from "@mui/material/Grid";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AreaChartComponent from "./AreaChartComponent";
import PieChartComponent from "./PieChartComponent";

import CountUp from "react-countup";
import axios from "axios";
import toast from "react-hot-toast";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";

const MainContent = () => {
	const [customerInfos, setCustomerInfos] = useState({
		totalCustomer: 0,
		totalCustomerReceipts: 0,
		receiptFees: 0,
		monthlyGoal: 10000,
	});

	useEffect(() => {
		const fetchDatas = async () => {
			try {
				const results = await axios.get(
					BASE_URL + "/customers?api_key=" + apiKey
				);

				if (!results.data.success) {
					return toast.error(results.data.error);
				}
				console.log(results.data);
				setCustomerInfos({
					totalCustomer: results.data.totalCustomer,
					totalCustomerReceipts: results.data.totalCustomerReceipts,
					receiptFees: results.data.receiptFees,
					monthlyGoal: results.data.monthlyGoal,
				});
			} catch (error) {
				toast.error(error.message);
			}
		};
		fetchDatas();
		console.log(customerInfos);
	}, []);

	return (
		<>
			<div className="p-6">
				<h1 className="text-2xl font-bold text-neutral-600">Dashboard</h1>
			</div>
			<Grid container paddingX={3} spacing={1}>
				<Grid item xs={12} sm={6} md={6} lg={3}>
					<div className="flex flex-col justify-around p-4 bg-white rounded-md border h-32">
						<div className="inline-flex justify-between items-center pb-4">
							<p className="uppercase text-xs font-bold">
								New Customers
							</p>
							<div
								id="cardIcon"
								className="flex items-center"
							>
								<PersonOutlineIcon color="secondary" />
							</div>
						</div>

						<div className="flex items-center gap-x-2">
							<CountUp
								start={0}
								end={customerInfos.totalCustomer}
								duration={2}
								delay={0}
							>
								{({ countUpRef }) => (
									<div
										ref={countUpRef}
										className="text-2xl font-bold"
									></div>
								)}
							</CountUp>

							<div className="flex relative text-red-400 pt-3 text-[14px]">
								<span className="relative top-[1px]">
									-30%
								</span>
								<span id="arrowIcon">
									<TrendingDownIcon fontSize="small" />
								</span>
							</div>
						</div>
						<div className="text-sm font-normal text-gray-500">
							Compared to previous month
						</div>
					</div>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={3}>
					<div className="flex flex-col justify-around p-4 bg-white rounded-md border ">
						<div className="inline-flex justify-between items-center pb-4">
							<p className="uppercase text-xs font-bold ">
								Profit{" "}
							</p>
							<div
								id="cardIcon"
								className="flex items-center"
							>
								<MonetizationOnIcon color="secondary" />
							</div>
						</div>

						<div className="flex items-center gap-x-2">
							<CountUp
								start={0}
								end={customerInfos.receiptFees}
								duration={2}
								delay={0}
							>
								{({ countUpRef }) => (
									<div
										ref={countUpRef}
										className="text-2xl font-bold"
									></div>
								)}
							</CountUp>

							<div className="flex relative text-red-400 pt-3 text-[14px]">
								<span className="relative top-[1px]">
									-13%
								</span>
								<span id="arrowIcon">
									<TrendingDownIcon fontSize="small" />
								</span>
							</div>
						</div>
						<div className="text-sm font-normal text-gray-500">
							Compared to previous month
						</div>
					</div>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={3}>
					<div className="flex flex-col justify-around p-4 bg-white rounded-md border ">
						<div className="inline-flex justify-between items-center pb-4">
							<p className="uppercase text-xs font-bold ">
								Revenue{" "}
							</p>
							<div
								id="cardIcon"
								className="flex items-center"
							>
								<RequestQuoteIcon color="secondary" />
							</div>
						</div>

						<div className="flex items-center gap-x-2">
							<CountUp
								start={0}
								end={
									customerInfos.totalCustomerReceipts ||
									1000
								}
								duration={2}
								delay={0}
							>
								{({ countUpRef }) => (
									<div
										ref={countUpRef}
										className="text-2xl font-bold"
									></div>
								)}
							</CountUp>
							<div className="flex relative text-green-400 pt-3 text-[14px]">
								<span className="relative top-[1px]">
									+21%
								</span>
								<span id="arrowIcon">
									<TrendingUpIcon fontSize="small" />
								</span>
							</div>
						</div>
						<div className="text-sm font-normal text-gray-500">
							Compared to previous month
						</div>
					</div>
				</Grid>

				<Grid item xs={12} sm={6} md={6} lg={3}>
					<div className="flex flex-col justify-around p-5 bg-white rounded-md border  h-32">
						<div className="uppercase font-bold text-xs text-gray-500">
							Monthly Goal
						</div>
						<div className="pb-2 text-lg font-semibold text-black/750">
							{`$${customerInfos.receiptFees} / $${customerInfos.monthlyGoal}`}
						</div>
						<div className="pt-2">
							<LinearProgress
								variant="buffer"
								style={{
									borderRadius: 5,
									height: 10,
								}}
								valueBuffer={100}
								value={Math.round(customerInfos.receiptFees / customerInfos.monthlyGoal *100)}
							/>
						</div>
					</div>
				</Grid>
			</Grid>

			<Grid container paddingTop={1} paddingX={3} spacing={1}>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<div className="flex flex-col items-center justify-evenly bg-white rounded-md h-[398px]">
						<div className="w-full text-2xl font-bold text-gray-500 px-4 relative bottom-4">
							Segments
						</div>
						<div className="w-full">
							<PieChartComponent />
						</div>
						<div className="w-full px-5 pt-4 flex items-center justify-around">
							<div className="flex flex-col font-semibold items-center  justify-center ">
								<div className="flex text-2xl font-bold text-black/70">
									%
									<CountUp
										start={0}
										end={23}
										duration={2}
										delay={0}
									>
										{({
											countUpRef,
										}) => (
											<div
												ref={
													countUpRef
												}
												className="text-2xl font-bold text-black/70"
											></div>
										)}
									</CountUp>
								</div>
								<div className="text-gray-500">
									Group A
								</div>
							</div>
							<div className="flex flex-col font-semibold items-center  justify-center ">
								<div className="flex text-2xl font-bold text-black/70">
									%
									<CountUp
										start={0}
										end={37}
										duration={2}
										delay={0}
									>
										{({
											countUpRef,
										}) => (
											<div
												ref={
													countUpRef
												}
												className="text-2xl font-bold text-black/70"
											></div>
										)}
									</CountUp>
								</div>
								<div className="text-gray-500">
									Group B
								</div>
							</div>
							<div className="flex flex-col font-semibold items-center  justify-center ">
								<div className="flex text-2xl font-bold text-black/70">
									%
									<CountUp
										start={0}
										end={40}
										duration={2}
										delay={0}
									>
										{({
											countUpRef,
										}) => (
											<div
												ref={
													countUpRef
												}
												className="text-2xl font-bold text-black/70"
											></div>
										)}
									</CountUp>
								</div>
								<div className="text-gray-500">
									Group C
								</div>
							</div>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={8} lg={8}>
					<div className="flex flex-col  justify-center p-2 bg-white rounded-md">
						<div className="text-2xl font-bold text-gray-500 px-4">
							Chart
						</div>
						<AreaChartComponent />
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default MainContent;
