import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const PORT = 8000;
dotenv.config();
const app = express();




app.use(express.json()); // json verileri almak için
app.use(express.urlencoded({ extended: true })); //tarayıcı verilerini almak için
app.use(cors());



app.get("/", (req,res)=>{
    res.json({info:"Server "+PORT+" portunda  Ayakta."})
})



app.listen(PORT, () => {
	console.log("Server " + PORT + " portundan ayağı kalktı.");
});
