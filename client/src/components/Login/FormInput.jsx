import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "./FormInput.css";
const FormInput = ({ placeholder, icon, type, formData, setFormData }) => {
	return (
		<TextField

			label=""
			placeholder={placeholder}
			size="small"
			fullWidth={true}
			InputProps={{
				className: "custom-input",
				startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
			}}
			onChange={(e) => {
				if (type == "text"){
					setFormData((prev) => {
						return {...prev,email:e.target.value}
					});
					return
				}
				setFormData((prev) => {
					return {...prev,password:e.target.value}
				});
				
			}}
			type={type}
			variant="outlined"
			color="info"
		/>
	);
};

export default FormInput;
