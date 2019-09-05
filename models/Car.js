const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, require: true }, //nhãn hiệu
  model: { type: String, require: true }, //mô hình
  manufacturingYear: { type: String, require: true }, // năm sản xuất
  licensePlate: { type: Number, require: true }, // Biễn số
  numberOfSeats: { type: Number, require: true },
  car: { type: String }
});

const Car = mongoose.model("Car", carSchema, "Car");

module.exports = {
  Car,
  carSchema
};
