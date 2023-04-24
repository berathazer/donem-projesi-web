import mongoose from "mongoose";
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	TCKN: {
		type: String,
		required: true,
		unique: true,
		minlength: 11,
		maxlength: 11,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
	},
	plate: {
		type: String,
		required: true,
	},
	
	total_park_time: {
		type: Number,
		default:0
	},

	total_fee: {
		type: Number,
		default:0
	},
	customer_status: {
		type:Number,
		default:1,
		required:true
	}

});

CustomerSchema.set('timestamps', true);

export default mongoose.model("customer", CustomerSchema);
