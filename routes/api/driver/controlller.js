const { Driver, driverSchema } = require("../../../models/Driver");
const { Car } = require("../../../models/Car");
const { User } = require("../../../models/User");
const bcrypt = require("bcryptjs");

module.exports.getDriverProfie = (req, res, next) => {
  Driver.find()
    .then(drivers => {
      res.status(200).json(drivers);
    })
    .catch(err => res.json(err));
};
module.exports.getDriverProfileById = (req, res, next) => {
  const { driverId } = req.params;
  Driver.findById(driverId)
    .then(driver => {
      if (!driver)
        return Promise.reject({ status: 404, message: "Trip not found" });
      res.status(200).json(driver);
    })
    .catch(err => {
      res.status(err.status).json({ err: err.message });
    });
};
module.exports.createDriverProfile = (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  const { address, passportld, mainJob, passengerRates } = req.body;
  const newprofile = new Driver({
    userId,
    address,
    passportld,
    mainJob,
    passengerRates
  });
  newprofile
    .save()
    .then(driver => {
      res.status(200).json(driver);
    })
    .catch(err => res.json(err));
};

module.exports.updateDriverProfileById = (req, res, next) => {
  const { driverId } = req.user.id;
  Driver.findOne({ driverId })
    .then(driver => {
      if (!driver)
        return Promise.reject({ status: 404, message: "Driver not found" });
      // const { userId, address, passportld, mainJob, passengerRates } = req.body;
      // driver.userId = userId;
      // driver.address = address;
      // driver.passportld = passportld;
      // driver.mainJob = mainJob;
      // driver.passengerRates = passengerRates;
      Object.keys(req.body).forEach(field => {
        driver[field] = req.body[field];
        driver
          .save()
          .then(driver => {
            res.status(200).json(driver);
          })
          .catch(err => err.json(err));
      });
    })
    .catch(err => {
      res.status(err.status).json({ err: err.message });
    });
};
module.exports.deleteDriverProfileById = (req, res, next) => {
  const { driverId } = req.params;
  Driver.deleteOne({ _id: driverId })
    .then(driver => {
      res.status(200).json(driver);
    })
    .catch(err => res.json(err));
};
module.exports.addDriverCar = (req, res, next) => {
  const { driverId } = req.user.id;
  const car = "http://www.kensap.org/wp-content/uploads/empty-photo.jpg";
  const {
    brand, //nhãn hiệu
    model, //mô hình
    manufacturingYear, // năm sản xuất
    licensePlate, // Biễn số
    numberOfSeats
  } = req.body;
  Driver.findOne({ driverId })
    .then(driver => {
      if (!driver)
        return Promise.reject({ status: 404, message: "Driver not found" });
      const newCarinfo = new Car({
        brand, //nhãn hiệu
        model, //mô hình
        manufacturingYear, // năm sản xuất
        licensePlate, // Biễn số
        numberOfSeats,
        car
      });
      driver.carInfo.push(newCarinfo);
      return driver.save();
    })
    .then(driver => res.status(200).json(driver))
    .catch(err => res.json(err));
};
module.exports.uploadCarImageById = (req, res, next) => {
  const userId = req.user.id;
  Driver.findOne({ userId })
    .then(driver => {
      if (!driver)
        return res.status(400).json({ error: "Can't find driver's profile" });
      // console.log(driver);
      const carId = req.params.carId;
      const car = req.file.path;
      let carLocate;
      let adjustedCar = driver.carInfo.find((c, index) => {
        carLocate = index;
        return c._id == carId;
      });
      if (!adjustedCar)
        return res.status(400).json({ message: "Cannot find car" });
      adjustedCar.car = car;

      driver.carInfo[carLocate] = adjustedCar;
      return driver.save();
    })
    .then(driver => {
      res.status(200).json(driver);
    })
    .catch(err => res.json(err));
};
module.exports.updateDriverCarById = (req, res, next) => {
  const userId = req.user.id;
  // const {
  //   brand,
  //   model,
  //   manufacturingYear,
  //   licensePlate,
  //   numberOfSeats
  // } = req.body;
  Driver.findOne({ userId })
    .then(driver => {
      if (!driver)
        return Promise.reject({ status: 400, message: "Driver not found" });
      const carId = req.params.carId;
      let carLocate;

      let adjustedCar = driver.carInfo.find((c, index) => {
        carLocate = index;
        return c._id == carId;
      });
      if (!adjustedCar)
        return res.status(400).json({ message: "Car not Found" });
      Object.keys(req.body).forEach(field => {
        adjustedCar[field] = req.body[field];
      });
      driver.carInfo[carLocate] = adjustedCar;
      return driver.save();
    })
    .then(driver => res.status(200).json(driver))
    .catch(err => res.json(err));
};

module.exports.deleteDriverCarbyId = (req, res, next) => {
  const userId = req.user.id;
  Driver.findOne({ userId })
    .then(driver => {
      if (!driver)
        return Promise.reject({ status: 400, message: "Driver not found" });
      const carId = req.params.carId;
      for (let i = 0; i < driver.carInfo.length; i++) {
        if (driver.carInfo[i]._id == carId) {
          driver.carInfo.splice(i, 1);
        }
      }
      return driver.save();
    })
    .then(driver => {
      res.status(200).json(driver.carInfo);
    })
    .catch(err => res.json(err));
};
