import { Router } from "express";

const router = Router();


router.get('/',(req,res)=>{
    res.json({"message":"Hello from Sensors"})
})



export default router