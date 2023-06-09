import Receipt from "../model/receiptModel";

const allReceipts = async (req, res) => {
	try {
		const receipts = await Receipt.find({}).populate({path:"receipt_customer_id",select:"TCKN plate fullName"}).populate({path:"receipt_park_id",select:"entry_time exit_time"});

		if (receipts.length == 0) {
			return res.json({ success: false, error: "Henüz Hiç Araç Girişi Olmamış." });
		}

		return res.json({ success: true, allReceipts: receipts });

	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};


const activeReceipts = async (req, res) => {
	try {
		const receipts = await Receipt.find({receipt_state:1});

		if (receipts.length == 0) {
			return res.json({ success: false, error: "Henüz Hiç Araç Girişi Olmamış." });
		}

		return res.json({ success: true, allReceipts: receipts });
        
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};


const passiveReceipts = async (req, res) => {
	try {
		const receipts = await Receipt.find({receipt_state:0});

		if (receipts.length == 0) {
			return res.json({ success: false, error: "Henüz Hiç Araç Girişi Olmamış." });
		}

		return res.json({ success: true, allReceipts: receipts });
        
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};





export default {
	allReceipts,
	activeReceipts,
	passiveReceipts
};
