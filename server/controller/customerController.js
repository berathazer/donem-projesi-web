import { response } from "express";
import Customer from "../model/customerModel";

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
			return res.json({ success: false, error: "Böyle bir müşteri zaten mevcut" });
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

const findCustomer = async (req, res) => {
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

const deleteCustomer = async (req, res) => {
	console.log("deleteCustomer");
	try {
		const { customerId } = req.body;
		const deletedUser = await Customer.findByIdAndDelete(customerId);

		if (deletedUser) {
			return res.json({
				success: true,
				message: "Müşteri başarıyla silindi",
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

const allCustomer = async (req, res) => {
	try {
		const customers = await Customer.find({}, {});
		return res.json({ success: true, customers: customers });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const activeCustomers = async (req, res) => {
	try {
		const customers = await Customer.find({ customer_status: 1 });

		if (customers.length == 0) {
			return res.json({ success: false, error: "Aktif Müşteri Kaydı Bulunamadı." });
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
			return res.json({ success: false, error: "Pasif Müşteri Kaydı Bulunamadı." });
		}

		return res.json({ success: true, passiveCustomers: customers });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

export default {
	index,
	addCustomer,
	findCustomer,
	deleteCustomer,
	allCustomer,
	activeCustomers,
	passiveCustomers,
};
