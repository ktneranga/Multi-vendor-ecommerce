const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Shop = require("../models/shop");
const { verifyToken } = require("../utils/jwt");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = verifyToken(token);

  req.user = await User.findById(decoded.id).select("-password");
  next();
});

exports.isSellerAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = verifyToken(seller_token);

  req.user = await Shop.findById(decoded.id).select("-password");
  next();
});
