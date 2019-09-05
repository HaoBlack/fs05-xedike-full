const multer = require("multer");
const path = require("path");

const uploadImage = type => {
  //type = "avatar" / "cart"
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // const uploadPath = path.join(__dirname + "/../../../uploads/avatars");
      // console.log(uploadPath);
      // cb(null, uploadPath);
      cb(null, `./uploads/${type}s`);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  var upload = multer({ storage: storage });

  return upload.single(type);
};
module.exports = {
  uploadImage
};
