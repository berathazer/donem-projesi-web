import Customer from "../model/customerModel";

const index = (req, res) => {
	res.json({ message: "Hello from Customers!" });
};

const addCustomer = async (req, res) => {
	try {
		//bilgileri aldık
		const { fullName, TCKN, email, phone, plate, currentUser } = req.body;

		//bilgiler uygunsa kontrol yapıyoruz aynı kayıttan olmasın diye

		const tempCustomer = await Customer.find({
			$or: [{ TCKN: TCKN }, { email: email }, { plate: plate }],
		});
		console.log("tempcustomer", tempCustomer);

		if (tempCustomer.length > 0) {
			return res.json({ success: false, error: "Böyle biri zaten mevcut" });
		}

		//artık kaydı ekleyebiliriz.
		const newCustomer = await Customer.create({ fullName, TCKN, email, phone, plate });
		newCustomer.save();

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
                createdAt:0,
                updatedAt:0,
                __v:0
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

const allCustomer = async (req, res) => {
    try {
        
        const customers = await Customer.find({},{});
        return res.json({ success:true,customers: customers})
    } catch (error) {
        return res.json({ success: false, error: error.message});
    }
}
export default {
	index,
	addCustomer,
	findCustomer,
    allCustomer
};
