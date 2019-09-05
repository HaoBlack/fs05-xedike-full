const express = require("express");
const router = express.Router();
const tripController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
// const { uploadImage } = require("../../../middlewares/uploadImage");

// GET    {host}/api/trips (PUBLIC)
// GET    {host}/api/trips/:id (PUBLIC)
// POST   {host}/api/trips (PUBLIC)
// PUT    {host}/api/trips/:id (PRIVATE)
// DELETE {host}/api/trips/:id (PRIVATE)

// PUT    {host}/api/trips/booking/:tripId

router.get("/", tripController.getTrips);
router.get("/:tripId", tripController.getTripsById);
router.post(
  "/",
  authenticate,
  authorize(["driver"]),
  tripController.createTrip
);
router.put(
  "/:tripId",
  authenticate,
  authorize(["driver","passenger"]),
  tripController.updateTripById
);
router.delete(
  "/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.deleteTripById
);

router.put(
  "/bookTrip/:tripId",
  authenticate,
  authorize(["passenger"]),
  tripController.bookingTrip
);
router.delete(
  "/cancelTrip/:tripId",
  authenticate,
  authorize(["passenger"]),
  tripController.cancelTrip
);
router.put(
    "/finishTrip/:tripId",
    authenticate,
    authorize(["driver"]),
    tripController.finishTrip
  );

module.exports = router;
