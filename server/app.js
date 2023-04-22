import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import userRouter from "./router/userRouter"
import customerRouter from "./router/customerRouter"
import sensorRouter from "./router/sensorRouter"
import receiptRouter from "./router/receiptRouter"
import parkRouter from "./router/parkRouter"

import db from "./config/db"


const PORT = 8000;
dotenv.config();
const app = express();




//app.use(express.json()); // json verileri almak için
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true})); //tarayıcı verilerini almak için
app.use(cors());



app.get("/", (req,res)=>{
    res.json({info:"Server "+PORT+" portunda  Ayakta."})
})



app.use("/api/users", userRouter);

app.use("/api/customers", customerRouter);

app.use("/api/sensors", sensorRouter);

app.use("/api/receipts", receiptRouter);

app.use("/api/parks", parkRouter);



app.listen(PORT, () => {
	console.log("Server " + PORT + " portundan ayağı kalktı.");
});
