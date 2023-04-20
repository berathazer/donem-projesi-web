import mongoose from "mongoose";

mongoose.set("strictQuery",true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/donemprojesi');
  console.log("Veritabanına bağlanıldı.");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default mongoose;