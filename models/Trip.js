const mongooes = require("mongoose");
const { User } = require("../models/User");

// const passengerShema = {
//   userId: [{ type: mongooes.Schema.Types.ObjectId, ref: "User" }], //id của use
//   locationGetIn: { type: String }, //Vị trí lên xe
//   locationGetOff: { type: String }, // Vị trí xuống xe
//   paymentMethod: { type: String }, //Phương thức thanh toán
//   numberOfBookingSeats: { type: Number }, //Số lượng đặt chỗ ngồi
//   notes: { type: String } // ghi chú
// };
const TripSchema = new mongooes.Schema({
  driverId: { type: mongooes.Schema.Types.ObjectId, ref: "User" }, //id tài xế
  locationFrom: String, //Vị trí từ....
  locationTo: String, //... đến vị trí
  startTime: Date, //Thời gian bắt đầu xuất phát
  options: String, //Các Option chuyến đi này có
  availableSeats: Number, //Chỗ ngồi có sẵn trên xe
  fee: Number, //Phí đi xe
  passengers: [
    {
      passengerId: { type: mongooes.Schema.Types.ObjectId, ref: "User" }, //id của use
      // locationGetIn: String , //Vị trí lên xe
      // locationGetOff: String , // Vị trí xuống xe
      // paymentMethod:  String , //Phương thức thanh toán
      numberOfBookingSeats: Number //Số lượng đặt chỗ ngồi
      // notes:  String // ghi chú}
    }
  ],

  isFinished: { type: Boolean, default: false }
});

const Trip = mongooes.model("Trip", TripSchema, "Trip");

module.exports = {
  Trip,
  TripSchema
};
