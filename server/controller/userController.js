import User from "../model/userModel";

import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email});
	if(!user){
		return res.json({success: false, message:"Email not found"})
	}

	//burda bcrypt ile şifre kontrolü yapılacak. 
	const hashedPassword = password;
	// şimdilik geçiyorum
	
	if(user.password == hashedPassword){
		//create jwt token
		const secret = process.env.JWT_LOGIN_SECRET_KEY;
		const token = jwt.sign({email:user.email,role:user.role},secret,{expiresIn:60*3600})
		
		//return jwt token
		return res.json({ success: true, token: token});
	}
	
	return res.json({ success: false, error: "Password is incorrect" });

};

const registerUser = async (req, res) => {
	const { email, password, token } = req.body;
	if (token == "first-user-token") {
		try {
			const result = await User.findOne({ email: email }).exec();

			if (result) {
				return res.json({ success: false, message: "User already registered" });
			}

			//user bulunamadıysa artık eklenebilir
			const newUser = await User.create({ email, password });
			newUser.save();
			return res.json({ success: true, user: newUser });
		} catch (error) {
			return res.json({ success: false, error: error });
		}
	}

	return res.json({ success: false, error: "Youre not allowed to register" });
};

export default {
	userLogin,
	registerUser,
};
