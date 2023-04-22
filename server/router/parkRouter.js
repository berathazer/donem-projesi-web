import { Router } from "express";

import parkController from "../controller/parkController";

import authMiddleware from "../middleware/authMiddleware";
import apiMiddleware from "../middleware/apiMiddleware";

const router = Router();



router.post("/new",parkController.createNewPark)

router.post("/exit",parkController.exitThePark)



export default router