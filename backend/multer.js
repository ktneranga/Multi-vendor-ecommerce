const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    const { userType } = req.body;
    console.log("useryupe", userType);
    if (userType === "seller") {
      cb(null, "uploads/sellers");
    } else {
      cb(null, "uploads/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + uniqueSuffix + ".png");
  },
});

exports.upload = multer({ storage: storage });
