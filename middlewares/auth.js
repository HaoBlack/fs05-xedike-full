const jwt = require("jsonwebtoken");
// (req, res, next) => {} middle ware
const authenticate = (req, res, next) => {
  const { token } = req.headers;
  // console.log(req.headers);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid " });
    if (decoded) {
      req.user = decoded;
      return next();
    }
  });
};

const authorize = userTypeArr => {
  //type: String
  return (req, res, next) => {
    if (
      userTypeArr.findIndex(userType => userType === req.user.userType) !== -1
    )
      return next();
    // if (userType === req.user.userType) return next();
    res.status(403).json({ message: "Logged in, but do not have permission" });
  };
};
module.exports = {
  authenticate,
  authorize
};
