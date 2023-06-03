import React from "react";
import SideBar from "../components/Home/SideBar";

const ReceiptsPage = () => {
	return (
		<div className="min-w-full min-h-screen flex  bg-login">
			<div className="flex-2 flex-col  relative  bg-white">
				<SideBar />
			</div>
			<div className="flex-8 flex flex-col bg-blue-50"></div>
		</div>
	);
};

export default ReceiptsPage;
