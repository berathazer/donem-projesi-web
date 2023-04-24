import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
	{
		receipt_fee: {
			type: Number,
			required: true,
		},
		receipt_customer_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "customers",
			required: true,
		},
		receipt_park_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "parks",
			required: true,
		},
		receipt_state:{
			type:Number,
			default:1,
			required: true
		}
	},
	{ timestamps: true }
);

const Receipt = mongoose.model("receipt", ReceiptSchema);

export default Receipt;
