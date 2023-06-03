import React, { useState, useEffect } from "react";
import SideBar from "../components/Home/SideBar";
import axios from "axios";

const apiKey = "29b068e5f73f77da112c8aa6435993bb";
const BASE_URL = "http://localhost:8000/api";

const ParksPage = () => {
	const [parks, setParks] = useState([]);

	useEffect(() => {
		const fetchParks = async () => {
			const response = await axios.get(
				BASE_URL + "/parks/?api_key=" + apiKey
			);
			if (response.data.success) {
				setParks([...response.data.allParks]);
			} else {
				console.log("fail:", response.data);
			}
		};
		fetchParks();
	}, []);
	console.log(parks);
	return (
		<div className="min-w-full min-h-screen flex  bg-login">
			<div className="flex-2 flex-col  relative  bg-white">
				<SideBar />
			</div>
			<div className="flex-8 flex flex-col bg-blue-50">
				<div className="flex flex-wrap gap-2 p-4">{parks.map((park, index) => {
          return <div key={index} className="px-4 py-2 bg-white rounded-md border border-gray-500">
            <div>{park.customer_id}</div>
            <div>{park.customer_plate}</div>
            <div>{park.park_state}</div>
            <div>{park.entry_time}</div>
            <div>{park.exit_time}</div>
          </div>
        })}</div>
			</div>
		</div>
	);
};

export default ParksPage;
