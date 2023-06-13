import React, { useEffect, useState } from "react";
import SideBar from "../components/Home/SideBar";
import { Card, Icon } from "semantic-ui-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";

const SingleUserPage = () => {
	const { customerId } = useParams();
	const [customer, setCustomer] = useState({
		total_fee: 0,
		total_park_time: 0,
		maxPark: 0,
		maxFee: 0,
	});
	const navigator = useNavigate();
	const navigateHandler = () => {
		navigator("/users/edit/" + customerId, { replace: true });
	};
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
				setCustomer({
					...response.data.customer,
					maxPark: Math.round(response.data.maxPark),
					maxFee: Math.round(response.data.maxFee),
					total_fee: Math.round(response.data.customer.total_fee)
				});
			}
		};
		fetchUser();
	}, []);
	console.log(customer);

	return (
		<div className="min-w-full min-h-screen flex  bg-login">
			<div className="flex-2 flex-col relative  bg-white">
				<SideBar />
			</div>
			<div className="flex-8 flex flex-col bg-blue-50">
				<div className="flex p-6 m-10 gap-x-16">
					<div className="">
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
									{customer?.createdAt}
								</a>
							}
						/>
					</div>

					<div className="flex flex-col gap-y-10   rounded-md">
						<div className="font-bold text-muted text-3xl flex justify-between">
							Customer Infos
							<Button
								style={{ width: 100, padding: 5 }}
								color="success"
								variant="contained"
								startIcon={<EditIcon />}
								onClick={navigateHandler}
							>
								Edit
							</Button>
						</div>
						<div className="flex gap-x-5 ">
							<div className="flex flex-col ">
								<Card.Group>
									<Card>
										<Card.Content>
											<Card.Description>
												TCKN
											</Card.Description>
											<Card.Meta className="opacity-0">
												-
											</Card.Meta>
											<Card.Header>
												{" "}
												{
													customer?.TCKN
												}
											</Card.Header>
										</Card.Content>
									</Card>

									<Card>
										<Card.Content>
											<Card.Description>
												Name
											</Card.Description>
											<Card.Meta className="opacity-0">
												-
											</Card.Meta>
											<Card.Header>
												{" "}
												{
													customer?.fullName
												}
											</Card.Header>
										</Card.Content>
									</Card>

									<Card>
										<Card.Content>
											<Card.Description>
												Mail
											</Card.Description>
											<Card.Meta className="opacity-0">
												-
											</Card.Meta>
											<Card.Header>
												{" "}
												{
													customer?.email
												}
											</Card.Header>
										</Card.Content>
									</Card>

									<Card>
										<Card.Content>
											<Card.Description>
												Phone
											</Card.Description>
											<Card.Meta className="opacity-0">
												-
											</Card.Meta>
											<Card.Header>
												{" "}
												{
													customer?.phone
												}
											</Card.Header>
										</Card.Content>
									</Card>

									<Card>
										<Card.Content>
											<Card.Description>
												Plate
											</Card.Description>
											<Card.Meta className="opacity-0">
												-
											</Card.Meta>
											<Card.Header>
												{" "}
												{
													customer?.plate
												}
											</Card.Header>
										</Card.Content>
									</Card>

									<Card>
										<Card.Content>
											<Card.Description>
												Status
											</Card.Description>
											<Card.Meta className="opacity-0">
												-
											</Card.Meta>
											<Card.Header className="w-full">
												{customer?.customer_status ===
												1 ? (
													<span className="text-green-500 w-52 text-center font-semibold bg-green-200 px-2 py-1 rounded-md">
														Active
													</span>
												) : (
													<span className="text-red-500 w-20 text-center font-semibold bg-red-200 px-2 py-1 rounded-md">
														Passive
													</span>
												)}
											</Card.Header>
										</Card.Content>
									</Card>

									<Card>
										<div className="flex flex-col gap-x-2 ">
											<span className="font-bold text-black/50 text-xl w-full">
												<div className="flex flex-col justify-around p-5 bg-white rounded-md border  h-32 ">
													<div className="uppercase font-bold text-xs text-gray-500">
														Total
														Fee
													</div>
													<div className="pb-2 text-lg font-semibold text-black/750">
														{`$${customer.total_fee} / $${customer.maxFee}`}
													</div>
													<div className="pt-2">
														<LinearProgress
															variant="buffer"
															style={{
																borderRadius: 5,
																height: 10,
															}}
															value={Math.round(
																(customer.total_fee /
																	customer.maxFee) *
																	100
															)}
															valueBuffer={
																100
															}
														/>
													</div>
												</div>
											</span>
										</div>
									</Card>

									<Card className="">
										<div className="flex ">
											<span className="font-bold text-black/50 text-xl w-full">
												<div className="flex flex-col justify-around p-5 bg-white rounded-md border  h-32 ">
													<div className="uppercase font-bold text-xs text-gray-500">
														Total
														Park
													</div>
													<div className="pb-2 text-lg font-semibold text-black/750">
														{`${customer.total_park_time} / ${customer.maxPark} Hours`}
													</div>
													<div className="pt-2">
														<LinearProgress
															variant="buffer"
															style={{
																borderRadius: 5,
																height: 10,
															}}
															value={Math.round(
																(customer.total_park_time /
																	customer.maxPark) *
																	100
															)}
															valueBuffer={
																100
															}
														/>
													</div>
												</div>
											</span>
										</div>
									</Card>
								</Card.Group>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleUserPage;
