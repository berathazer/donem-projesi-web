import { Router } from "express";

import customerController from "../controller/customerController";

import authMiddleware from "../middleware/authMiddleware";
import apiMiddleware from "../middleware/apiMiddleware";
const router = Router();


router.get("/",[apiMiddleware],customerController.allCustomer)

router.get("/find",[apiMiddleware],customerController.findCustomer)




router.post("/new",[authMiddleware],customerController.addCustomer);


export default router