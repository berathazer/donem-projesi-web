import { Router } from "express";
import receiptController from "../controller/receiptController"

const router = Router();


router.get("/", receiptController.allReceipts)
router.get("/active-receipts", receiptController.activeReceipts)
router.get("/passive-receipts", receiptController.passiveReceipts)

export default router