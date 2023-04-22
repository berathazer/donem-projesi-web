import httpError from "http-errors";
import jwt from "jsonwebtoken";

/*import dotenv from "dotenv";
dotenv.config();
*/

const authMiddleware = (req, res, next) => {
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
			return next();
		});
	} catch (error) {
		return res.json({ deneme: "deneme", error: error.message });
		//return next(httpError(400,error))
	}
};

export default authMiddleware;
