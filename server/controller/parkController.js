import Park from "../model/parkModel";
import Customer from "../model/customerModel";
import Receipt from "../model/receiptModel";

const createNewPark = async (req, res) => {
	try {
		const { customerId, plate } = req.body;
		const customer = await Customer.findById(customerId);
		if (!customer) {
			return res.json({ success: false, error: "Bu plaka sisteme kayıtlı değil." });
		}

		if (customer.plate != plate) {
			return res.json({
				success: false,
				error: "Gönderilen Plaka Bu Kullanıcıya Ait Değil.",
			});
		}

		const tempPark = await Park.findOne({
			$and: [{ customer_id: customerId }, { customer_plate: plate }, { park_state: 1 }],
		});

		if (tempPark) {
			return res.json({ success: false, error: "Bu müşteri zaten park halinde görünüyor." });
		}

		const newPark = await Park.create({
			customer_id: customerId,
			customer_plate: plate,
			entry_time: new Date().setUTCHours(new Date().getUTCHours() + 3),
			exit_time: null,
			park_state: 1,
		});

		newPark.save();

		return res.json({
			success: true,
			park: newPark,
			message: plate + " Aracının Girişi Başarıyla Yapıldı.",
		});
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const exitThePark = async (req, res) => {
	try {
		const { plate } = req.body;
		console.log(plate);
		const park = await Park.findOne({ $and: [{ customer_plate: plate }, { park_state: 1 }] });

		if (!park) {
			return res.json({
				success: false,
				error: "Park Girişi Bulunamadı. Çıkış Yapılamıyor.",
			});
		}

		if (park.park_state == 0) {
			return res.json({
				success: false,
				error: "Zaten Çıkış Yapılmış!",
			});
		}
		// ÇIKIŞ İŞLEMLERİ

		// giriş ve çıkış arasındaki süre hesaplanarak fiş kesilecek ve fişler collectionuna kaydedilecek
		//tr saatine dönüştürdük

		const currentDate = new Date();
		currentDate.setUTCHours(currentDate.getUTCHours() + 3);

		const oldDate = new Date(park.entry_time);

		const dateDiff = Math.round((currentDate - oldDate) / (1000 * 60));
		const hourDiff = dateDiff / 60;
	
		//bu fee değeri ilerde hesaplanarak değiştirilecek şimdilik temsili bir değer. (+)
		const fee = process.env.INITIAL_FEE + process.env.HOURLY_FEE * hourDiff;

		const newReceipt = await Receipt.create({
			receipt_fee: fee,
			receipt_customer_id: park.customer_id,
			receipt_park_id: park.id,
		});
		newReceipt.save();

		// park durumu 0 olucak ve receipt_id si güncellenecek
		Park.findByIdAndUpdate(
			park.id,
			{
				$set: {
					park_state: 0,
					exit_time: new Date().setUTCHours(new Date().getUTCHours() + 3),
					receipt_id: newReceipt.id,
				},
			},
			{ new: true }
		)
			.then((updatedPark) => {
				//şuanlık işlem yapılmasına gerek yok
			})
			.catch((error) => {
				return res.json({ success: false, error: error.message });
			});

		// müşterinin total_time,total_fee bilgileri güncellenecek
		Customer.findByIdAndUpdate(
			park.customer_id,
			{ $inc: { total_park_time: hourDiff, total_fee: fee } },
			{ new: true }
		)
			.then((updatedCustomer) => {
				//şuanlık işlem yapılmasına gerek yok
			})
			.catch((error) => {
				return res.json({ success: false, error: error.message });
			});

		// her şey tamamsa artık çıkışı yapıp fiş kesebiliriz.
		return res.json({ success: true, receipt: newReceipt });

		// kapı açılacak.
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};


const activeParks = async (req, res) => {
	try {
		const parks = await Park.find({ park_state: 1 });
		
		if (parks.length == 0) {
			return res.json({ success: false, error: "Otoparkta Araç Gözükmüyor." });
		}

		return res.json({ success: true, activeParks: parks, carCount: parks.length });
	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const passiveParks = async (req, res) => {
	try {
		const parks = await Park.find({ park_state: 0 });

		if (parks.length == 0) {
			return res.json({ success: false, error: "Henüz Hiç Araç Çıkışı Olmamış." });
		}

		return res.json({ success: true, passiveParks: parks });

	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

const allParks = async (req, res) => {
	try {

		const parks = await Park.find({});

		if (parks.length == 0) {
			return res.json({ success: false, error: "Henüz Hiç Araç Girişi Olmamış." });
		}

		return res.json({ success: true, allParks: parks });

	} catch (error) {
		return res.json({ success: false, error: error.message });
	}
};

export default {
	createNewPark,
	exitThePark,
	activeParks,
	passiveParks,
	allParks,
};
