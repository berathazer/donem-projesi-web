import mongoose from "mongoose";

const ParkSchema = new mongoose.Schema({
	customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
	customer_plate:{ type:String, required:true },
	receipt_id:{ type: mongoose.Schema.Types.ObjectId, ref: "receipt", default:null },
	entry_time: { type: Date, default: new Date() },
	exit_time: { type: Date, default: null},
	park_state: { type: Number,default: 1 },
});

const Park = mongoose.model("park", ParkSchema);

export default Park;
