import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "./FormInput.css"
const FormInput = ({placeholder,icon,type,classes}) => {
	return (
		<TextField
			id="input-with-icon-textfield"
			label=""
			placeholder={placeholder}
			size="small"
			fullWidth={true}
			InputProps={{
				className:"custom-input",
				startAdornment: (
					<InputAdornment position="start">
						{icon}
					</InputAdornment>
				),
			}}

            type={type}
			variant="outlined"
            color="info"

        
		/>
	);
};

export default FormInput;
