import Park from "../model/parkModel";
import Customer from "../model/customerModel";
import Receipt from "../model/receiptModel";

const createNewPark = async (req, res) => {
	try {
		const { customerId, plate } = req.body;

		const customer = await Customer.find({ plate: plate });

		if (customer.length == 0) {
			return res.json({ success: false, error: "Bu plaka sisteme kayıtlı değil." });
		}

		const tempPark = await Park.find({ customer_id: customerId });

		if (tempPark.length > 0) {
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

		const park = await Park.findOne({ customer_plate: plate });

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

		// park durumu 0 olucak
		Park.findByIdAndUpdate(
			park.id,
			{
				$set: {
					park_state: 0,
					exit_time: new Date().setUTCHours(new Date().getUTCHours() + 3),
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

		// giriş ve çıkış arasındaki süre hesaplanarak fiş kesilecek ve fişler collectionuna kaydedilecek
		//tr saatine dönüştürdük
		const currentDate = new Date();
		currentDate.setUTCHours(currentDate.getUTCHours() + 3);

		const oldDate = new Date(park.entry_time);

		const dateDiff = Math.round((currentDate - oldDate) / (1000 * 60));
		const hourDiff = dateDiff / 60;
		console.log(dateDiff, hourDiff);

		//bu fee değeri ilerde hesaplanarak değiştirilecek şimdilik temsili bir değer.
		const fee = 24;

		const newReceipt = await Receipt.create({
			receipt_fee: fee,
			receipt_customer_id: park.customer_id,
			receipt_park_id: park.id,
		});
		newReceipt.save();

		// müşterinin total_time,total_fee bilgileri güncellenecek ve park durumu 0 yapılacak

		Customer.findByIdAndUpdate(
			park.customer_id,
			{ $inc: { total_park_time: dateDiff, total_fee: fee } },
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

export default {
	createNewPark,
	exitThePark,
};
