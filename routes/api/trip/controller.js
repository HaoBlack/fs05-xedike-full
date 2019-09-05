const { Trip, passengerShema } = require("../../../models/Trip");
const { User } = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getTrips = (req, res, next) => {
  Trip.find()
    // .select("- ...")
    .then(trips => {
      res.status(200).json(trips);
    })
    .catch(err => err.json(err));
};

module.exports.createTrip = (req, res, next) => {
  const driverId = req.user.id;
  const {
    // driverId,
    locationFrom,
    locationTo,
    startTime,
    // options,
    availableSeats,
    fee
    // passengers: [
    //   {
    //     userId,
    //     // locationGetIn,
    //     // locationGetOff,
    //     // paymentMethod,
    //     numberOfBookingSeats,
    //     notes
    //   }
    // ],
    // isFinished
  } = req.body;
  const newTrip = new Trip({
    driverId,
    locationFrom,
    locationTo,
    startTime,
    // options,
    availableSeats,
    fee
    // passengers: [
    //   {
    //     userId,
    //     locationGetIn,
    //     locationGetOff,
    //     paymentMethod,
    //     numberOfBookingSeats,
    //     notes
    //   }
    // ],
    // isFinished
  });
  newTrip
    .save()
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
module.exports.getTripsById = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .populate("driverId", "avatar email -_id")
    .then(trip => {
      if (!trip)
        return Promise.reject({ status: 404, message: "Trip not found" });

      res.status(200).json(trip);
    })
    .catch(err => {
      res.status(err.status).json({ err: err.message });
    });
};
module.exports.updateTripById = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then(trip => {
      if (!trip)
        return Promise.reject({ status: 404, message: "Trip not found" });
      Object.keys(req.body).forEach(field => {
        trip[field] = req.body[field];
        trip
          .save()
          .then(trip => {
            res.status(200).json(trip);
          })
          .catch(err => err.json(err));
      });
    })
    .catch(err => {
      res.status(err.status).json({ err: err.message });
    });
};
module.exports.deleteTripById = (req, res, next) => {
  const { tripId } = req.params;

  Trip.deleteOne({ _id: tripId })
    .then(result => res.status(200).json(result))
    .catch(err => err.json(err));
};

module.exports.bookingTrip = (req, res, next) => {
  const passengerId = req.user.id;
  const { numberOfBookingSeats } = req.body;
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then(trip => {
      if (trip.availableSeats < numberOfBookingSeats)
        return Promise.reject({ status: 400, message: "Not enough seats" });

      const passenger = {
        passengerId,
        numberOfBookingSeats
      };
      trip.passengers.push(passenger);
      trip.availableSeats = trip.availableSeats - numberOfBookingSeats;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json({ message: err.message });
    });
};
module.exports.cancelTrip = (req, res, next) => {
  const { tripId } = req.params;
  const useid = req.user.id;
  Trip.findById(tripId)
    .then(trip => {
      const psg = trip.passengers;
      psg.splice(0, 1);
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};

module.exports.finishTrip = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then(trip => {
      trip.isFinished = true;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};
