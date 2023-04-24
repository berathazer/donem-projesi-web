import { Router } from "express";

import parkController from "../controller/parkController";

import authMiddleware from "../middleware/authMiddleware";
import apiMiddleware from "../middleware/apiMiddleware";

const router = Router();

router.get("/", [apiMiddleware], parkController.allParks);

router.get("/active-parks", [apiMiddleware], parkController.activeParks);

router.get("/passive-parks", [apiMiddleware], parkController.passiveParks);

router.post("/new", parkController.createNewPark);

router.post("/exit", parkController.exitThePark);

export default router;
