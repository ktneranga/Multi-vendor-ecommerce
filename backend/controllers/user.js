const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const {
  createActivationToken,
  verifyToken,
  sendToken,
} = require("../utils/jwt");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log("req.file", req.file);
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const file = req.file.filename;
      const filePath = `uploads/${file}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });

      return next(new ErrorHandler("User already exist", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        // message: `Hello ${user.name}, please click on the link to activate your account ${activationUrl} `,
        activationUrl: activationUrl,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message), 400);
  }
});

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      //get the token when activating
      const { token } = req.body;

      //verify token and extract user details
      const newUser = verifyToken(token);

      if (!newUser) {
        return next(new ErrorHandler("Invlid token", 400));
      }

      const { name, email, password, avatar } = newUser;

      //check user already exist
      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exist", 400));
      }

      //save user into db
      user = await User.create(newUser);

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/loin-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist"));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Password does not match", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message));
    }
  })
);

//load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.messae, 500));
    }
  })
);

//logout user
router.get("/logout", isAuthenticated, (req, res) => {
  try {
    res
      .status(201)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = router;
