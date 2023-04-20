import { Router } from "express";
import userController from "../controller/userController"

const router = Router();

router.get("/", (req, res) => {
	setTimeout(() => {
		return res.json({
			users: [
				{
					name: "berat",
					age: 20,
				},
				{
					name: "burcu",
					age: 21,
				},
				{
					name: "berkan",
					age: 22,
				},
				{
					name: "ahmet",
					age: 23,
				},
			],
		});
	}, 500);
});


router.post("/login",userController.userLogin)

router.post("/register",userController.registerUser)


export default router