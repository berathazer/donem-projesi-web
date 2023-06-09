import httpError from "http-errors";
import jwt from "jsonwebtoken";

/*
const authMiddleware = (req, res, next) => {
	console.log("auth middleware");
	try {
		const tokenString = req.header("Authorization");
		if (!tokenString) {
			return httpError(404, "Token is required.");
		}
		const token = tokenString.split(" ")[1];
		if (!token) {
			return httpError(404, "Token is not correct format.");
		}

		const secret = process.env.JWT_LOGIN_SECRET_KEY;
		const result = jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				return res.json({ success: false, err: err });
			}
			req.body.currentUser = decoded;
			return next(); // eğer tüm herşey doğruysa istek yoluna devam edebilir
		});
	} catch (error) {
		return res.json({ deneme: "deneme", error: error.message });
	}
};
*/

const authMiddleware = (req, res, next) => {
	try {
		const tokenString = req.header("Authorization");
		if (!tokenString) {
			return res.json({ error: "Token is required." });
		}
		const token = tokenString.split(" ")[1];
		if (!token) {
			return res.json({ error: "Token is not in the correct format." });
		}

		const secret = process.env.JWT_LOGIN_SECRET_KEY;
		jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				return res.json({ success: false, err: err.message });
			}
			req.body.currentUser = decoded;
			return next();
		});
	} catch (error) {
		return res.json({ deneme: "deneme", error: error.message });
	}
};
export default authMiddleware;
