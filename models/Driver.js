const mongoose = require("mongoose");
const { carSchema } = require("./Car");

const driverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String, require: true },
  passportld: { type: String, require: true },
  mainJob: { type: String, require: true },
  carInfo: { type: [carSchema] },
  passengerRates: { type: String, require: true }
});

const Driver = mongoose.model("Driver", driverSchema, "Driver");
module.exports = {
  driverSchema,
  Driver
};
