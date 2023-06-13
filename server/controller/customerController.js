import Customer from "../model/customerModel";
import Receipt from "../model/receiptModel";
import Park from "../model/parkModel";

const index = (req, res) => {
	res.json({ message: "Hello from Customers!" });
};

const addCustomer = async (req, res) => {
	try {
		const { fullName, TCKN, email, phone, plate, currentUser } = req.body;

		const tempCustomer = await Customer.find({
			$or: [{ TCKN: TCKN }, { email: email }, { plate: plate }],
		});
		if (tempCustomer.length > 0) {
			return res.json({
				success: false,
				error: "Böyle bir müşteri zaten mevcut",
			});
		}

		const newCustomer = await Customer.create({ fullName, TCKN, email, phone, plate });
		newCustomer.save();

		//yeni kullanıcıyı döndür, isteği tamamla
		return res.json({
			success: true,
			message: "Customer created successfully",
			currentUser,
			customer: newCustomer,
		});
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const findCustomerWithPlate = async (req, res) => {
	// gelen plakayı al +
	// plakayı veritabanında ara    +
	// varsa müşteriyi döndür   +
	// yoksa müşteri bulunumadı döndür  +

	try {
		const plate = req.query.plate;

		const customer = await Customer.find(
			{ plate: plate },
			{
				createdAt: 0,
				updatedAt: 0,
				__v: 0,
			}
		);

		if (customer.length == 0) {
			return res.json({ success: false, error: "Plaka sisteme kayıtlı değil." });
		}

		// müşteri bulunmuştur artık döndürebiliriz.
		return res.json({ success: true, customer: customer });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const findCustomerWithId = async (req, res) => {
	try {
		const customerId = req.query.id;
		const customer = await Customer.findById(customerId, {
			updatedAt: 0,
			__v: 0,
		});

		if (customer.length == 0) {
			return res.json({
				success: false,
				error: "Böyle bir kullanıcı kayıtlı değil.",
			});
		}

		const maxPark = await Customer.findOne({})
			.sort({ total_park_time: -1 }) // total_park_time'a göre sıralanır (en yüksekten en düşüğe)
			.exec();

		// müşteri bulunmuştur artık döndürebiliriz.
		return res.json({
			success: true,
			customer: customer,
			maxPark: maxPark.total_park_time,
			maxFee: maxPark.total_fee,
		});
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const deleteCustomer = async (req, res) => {
	try {
		const { customerId } = req.body;

		const tempPark = await Park.find({
			$and: [{ customer_id: customerId, park_state: 1 }],
		});

		const tempReceipt = await Receipt.find({
			$and: [{ receipt_customer_id: customerId, receipt_state: 1 }],
		});

		if (tempPark.length > 0 || tempReceipt.length > 0) {
			return res.json({
				success: false,
				message: "Bu müşterinin aktif park kaydı veya aktif fişi mevcut silinemez.",
			});
		}

		const deletedUser = await Customer.findByIdAndUpdate(
			customerId,
			{ customer_status: 0 },
			{ new: true }
		);

		if (deletedUser) {
			return res.json({
				success: true,
				message: "Müşteri başarıyla pasif hale getirildi.",
				deletedUser: deletedUser,
			});
		} else {
			return res.json({
				success: false,
				message: "Müşteri bulunamadı",
			});
		}
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const setStatusToActive = async (req, res) => {
	try {
		const { customerId } = req.body;

		const updatedUser = await Customer.findByIdAndUpdate(
			customerId,
			{ customer_status: 1 },
			{ new: true }
		);

		if (!updatedUser) {
			return res.json({
				success: false,
				message: "Müşteri bulunamadı",
			});
		}

		return res.json({
			success: true,
			message: "Müşteri başarıyla aktif hale getirildi.",
			updatedUser: updatedUser,
		});
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const updateCustomer = async (req, res) => {
	try {
		const customer = req.body;

		const customerId = customer._id;
		console.log(customer, customerId);

		const updatedCustomer = await Customer.findByIdAndUpdate(customerId, customer, {
			new: false,
		});

		if (!updatedCustomer) {
			return res.json({
				success: false,
				message: "Güncelleme İşleminde Bir Hata Oluştu.",
			});
		}

		return res.json({
			success: true,
			customer: updatedCustomer,
			message: "Müşteri başarıyla güncellendi.",
		});

		return res.json({ success: true, message: "deneme mesaji." });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const allCustomer = async (req, res) => {
	try {
		const customers = await Customer.find({}, {});

		//const receipts = await Receipt.find({}, {});

		const result = await Receipt.aggregate([
			{
				$group: {
					_id: null,
					totalReceiptFee: { $sum: "$receipt_fee" },
				},
			},
		]).exec();

		const receiptFees = result[0].totalReceiptFee;

		Customer.aggregate([
			{
				$group: {
					_id: null,
					totalCustomerReceipts: { $sum: "$total_fee" },
				},
			},
		])
			.exec()
			.then((result) => {
				const totalCustomerReceipts = result[0].totalCustomerReceipts;
				return res.json({
					success: true,
					customers: customers,
					totalCustomer: customers.length,
					totalCustomerReceipts: totalCustomerReceipts,
					receiptFees: receiptFees,
					monthlyGoal: parseInt(process.env.MONTHLY_GOAL),
				});
			})
			.catch((error) => {
				return res.json({ success: false, error: error.message });
			});
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const activeCustomers = async (req, res) => {
	try {
		const customers = await Customer.find({ customer_status: 1 });

		if (customers.length == 0) {
			return res.json({
				success: false,
				error: "Aktif Müşteri Kaydı Bulunamadı.",
			});
		}

		return res.json({ success: true, activeCustomers: customers });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const passiveCustomers = async (req, res) => {
	try {
		const customers = await Customer.find({ customer_status: 0 });

		if (customers.length == 0) {
			return res.json({
				success: false,
				error: "Pasif Müşteri Kaydı Bulunamadı.",
			});
		}

		return res.json({ success: true, passiveCustomers: customers });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

export default {
	index,
	addCustomer,
	findCustomerWithPlate,
	findCustomerWithId,
	deleteCustomer,
	updateCustomer,
	allCustomer,
	activeCustomers,
	passiveCustomers,
	setStatusToActive,
};
