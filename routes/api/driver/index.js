const express = require("express");
const router = express.Router();
const driverController = require("./controlller");
const { authenticate, authorize } = require("../../../middlewares/auth");
const { uploadImage } = require("../../../middlewares/uploadImage");

//GET {host}/api/driver {PUBLIC}
//GET {host}/api/driver/:iddriver {PUBLIC}
//POST {host}/api/driver {PUBLIC}
//PUT {host}/api/driver/:iddriver (PRIVATE)
//DELETE {host}/api/driver/:iddriver (PRIVATE)

// router.get("/")

router.get("/", authenticate, driverController.getDriverProfie); //(PUBLIC)
router.get("/:driverId", authenticate, driverController.getDriverProfileById); //(PUBLIC)
router.post(
  "/",
  authenticate,
  authorize(["driver"]),
  driverController.createDriverProfile
);
router.put(
  "/updateDriverProfile",
  authenticate,
  authorize(["driver"]),
  driverController.updateDriverProfileById
);
router.delete(
  "/:driverId",
  authenticate,
  authorize(["driver"]),
  driverController.deleteDriverProfileById
);
router.put(
  "/addCar",
  authenticate,
  authorize(["driver"]),
  driverController.addDriverCar
);
router.put(
  "/uploadCarImage/:carId",
  authenticate,
  authorize(["driver"]),
  uploadImage("car"),
  driverController.uploadCarImageById
);
router.put(
  "/updateDriverCar/:carId",
  authenticate,
  authorize(["driver"]),
  driverController.updateDriverCarById
);
router.post(
  "/deleteDriverCar/:carId",
  authenticate,
  authorize(["driver"]),
  driverController.deleteDriverCarbyId
);

module.exports = router;
