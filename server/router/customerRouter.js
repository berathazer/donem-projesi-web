import { Router } from "express";

import customerController from "../controller/customerController";

import authMiddleware from "../middleware/authMiddleware";
import apiMiddleware from "../middleware/apiMiddleware";
const router = Router();

//<GET>
router.get("/", [apiMiddleware], customerController.allCustomer);

router.get("/active-customers", [apiMiddleware], customerController.activeCustomers);

router.get("/passive-customers", [apiMiddleware], customerController.passiveCustomers);

router.get("/find", [apiMiddleware], customerController.findCustomer);
//</GET/>//


//<POST>
router.post("/new", [authMiddleware], customerController.addCustomer);
router.post("/delete", [authMiddleware], customerController.deleteCustomer);
//</POST/>

export default router;
