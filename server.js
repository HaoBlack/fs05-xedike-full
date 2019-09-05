const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/api/user/index");
const tripRouter = require("./routes/api/trip/index");
const driverRouter = require("./routes/api/driver/index");

const mongoUri =
  process.env.NODE_DEV === "dev"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;
// let mongoUri = "";
// switch (process.env.NODE_DEV) {
//   case "dev":
//       mongoUri = process.env.MONGO_URI_DEV;
//     break;
//   case "prod":
//       mongoUri = process.env.MONGO_URI_PROD;
//     break;

//   default:
//       mongoUri = process.env.MONGO_URI_PROD;
// }
// console.log(typeof process.env.NODE_DEV, process.env.NODE_DEV === "dev");
mongoose
  .connect(
    mongoUri,
    // "mongodb://localhost:27017/fs05-xedike",
    // "mongodb+srv://admin:admin@cluster0-mnuh7.mongodb.net/XEDIKE?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log("Connected successfully"))
  .catch(err => console.log(err));

const app = express();
app.use("/", express.static("public"));

//cors app ,network error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, fingerprint"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
///middleware parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// middleware serve static files
app.use("/uploads/avatars", express.static("./uploads/avatars"));


// middleware route handler
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);
app.use("/api/drivers", driverRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
