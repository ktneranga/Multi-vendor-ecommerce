const express = require("express");
const router = express.Router();
const path = require("path");
const Shop = require("../models/shop");
const { upload } = require("../multer");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const {
  createActivationToken,
  verifyToken,
  sendShopToken,
} = require("../utils/jwt");
const sendEmail = require("../utils/sendMail");
const { exit } = require("process");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  isAuthenticated,
  isSellerAuthenticated,
} = require("../middleware/auth");

//create-shop - create activation token and send the email
router.post("/create-seller", upload.single("file"), async (req, res, next) => {
  try {
    const {
      shopName,
      email,
      password,
      phoneNumber,
      description,
      address,
      zipCode,
      userType,
    } = req.body;
    const file = req.file.filename;
    //check if user exist
    const user = await Shop.findOne({ email });

    if (user) {
      //if user exist remove the uploaded image
      const filePath = `uploads/${file}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });

      return next(new ErrorHandler("Seller already exist", 400));
    }

    const fileUrl = path.join(file);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const seller = {
      shopName: shopName,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      description: description,
      address: address,
      zipCode: zipCode,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller-activation/${activationToken}`;

    //sending the email to seller
    try {
      await sendEmail({
        email: seller.email,
        subject: "Activate your account",
        activationUrl: activationUrl,
      });
      res.status(200).json({
        success: true,
        message: `Please check your email:- ${seller.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//activation - activate the seller and save to db
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.body;

      //verify token and extract seller details
      const newSeller = verifyToken(token);

      //if there is no seller
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { email } = newSeller;

      console.log(email);

      // check if the seller already exist
      const seller = await Shop.findOne({ email });

      // if seller exist, return an error
      if (seller) {
        return next(new ErrorHandler("User already exist", 403));
      }

      //if not create the seller
      seller = await Shop.create(newSeller);
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message));
    }
  })
);

//login seller
router.post(
  "/seller-login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (email == "" || password == "") {
        return next(new ErrorHandler("Please provide all fields", 400));
      }

      //check if user exist
      const seller = await Shop.findOne({ email });

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Password does not match", 400));
      }

      sendShopToken(seller, 200, res);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message));
    }
  })
);

router.get(
  "/get-seller",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
