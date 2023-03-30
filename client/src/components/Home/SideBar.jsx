import React from "react";
import SpeedIcon from "@mui/icons-material/Speed";
import Badge from "@mui/material/Badge";
import SideLink from "./SideLink";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from "@mui/icons-material/Business";

import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<>
			<div className="px-4 border-b border-gray-400 py-4 h-16 flex items-center">
				<div className="flex w-full items-center gap-x-3">
					<BusinessIcon fontSize="large" color="secondary" />
					<span className="text-2xl font-semibold text-gray-600">Beracorp</span>
				</div>
			</div>

			<div className="flex flex-col px-4 py-2 pt-10">
				<SideLink
					icon={
						<SpeedIcon
							fontSize="large"
							className="group-hover:text-white/80 text-cyan-700"
						/>
					}
					to={"/dashboard"}
					name={"Dashboard"}
					badge={"New"}
				/>

				<p className="pt-6 pb-2 px-2 text-black/50 font-bold text-[12px] uppercase">
					Users
				</p>

				<SideLink
					icon={
						<PeopleIcon
							fontSize="large"
							className="group-hover:text-white/80 text-gray-600"
						/>
					}
					to={"/users"}
					name={"Lists"}
				/>

				<SideLink
					icon={
						<PersonAddIcon
							fontSize="large"
							className="group-hover:text-white/80 text-blue-900"
						/>
					}
					to={"/users/new-user"}
					name={"New"}
				/>

				<p className="pt-6 pb-2 px-2 text-black/50 font-bold text-[12px] uppercase">
					Components
				</p>

				<SideLink
					icon={
						<SpeedIcon
							fontSize="large"
							className="group-hover:text-white/80 text-cyan-600"
						/>
					}
					name={"Dashboard"}
				/>

				<SideLink
					icon={
						<SpeedIcon
							fontSize="large"
							className="group-hover:text-white/80 text-cyan-600"
						/>
					}
					name={"Dashboard"}
					badge={"New"}
				/>
			</div>

			<div className="flex items-center w-full bottom-0 absolute border-t border-t-gray-100 gap-x-4 px-4 py-2 justify-between">
				<div className="flex items-center justify-center gap-x-4">
					<div className="flex items-center justify-center ">
						<Avatar sx={{ bgcolor: "orange" }}>BH</Avatar>
					</div>
					<div className="flex flex-col py-2">
						<div className="text-sm text-gray-600 font-semibold">Berat Hazer</div>
						<div className="text-xs font-semibold text-muted">System Admin</div>
					</div>
				</div>
				<Link  to={"/login"} replace={false} className="cursor-pointer">
					<LogoutIcon color="secondary" />
				</Link>
			</div>
		</>
	);
};

export default SideBar;
