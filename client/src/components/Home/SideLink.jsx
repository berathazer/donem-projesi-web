import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
const SideLink = ({ name, icon, badge = "", to }) => {
	const [active, setActive] = useState(false);

	const navigate = useNavigate();

	const navigateHandler = () => {
		setActive(true);
		return navigate(to);
	};

	return (
		<div
			onClick={navigateHandler}
			className={`flex items-center justify-between w-full text-[#6f7783] font-normal  
			cursor-pointer hover:bg-blue-500 p-2 rounded-md hover:text-white/80 group transition-all duration-300
			 ${active ? "bg-blue-500 text-white/90" : ""}`}
		>
			<div className="inline-flex gap-x-3 items-center ">
				{icon}
				{name}
			</div>
			{badge !== "" && (
				<div>
					<span
						className={`bg-blue-600 group-hover:bg-white group-hover:text-blue-600 text-white font-semibold p-1 rounded-md text-xs ${
							active ? "bg-white text-blue-600" : ""
						}`}
					>
						{badge}
					</span>
				</div>
			)}
		</div>
	);
};

export default SideLink;
