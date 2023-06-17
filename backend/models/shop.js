const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sellerSchema = mongoose.Schema({
  shopName: {
    type: String,
    unique: true,
    required: [true, "Please enter seller name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enbter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter the Phone Number"],
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// jwt token
sellerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

sellerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema);
