const jsonwebtoken = require("jsonwebtoken");

const createActivationToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.ACTIVATION_SECTER, {
    expiresIn: "5m",
  });
};

const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
};

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

const sendShopToken = (seller, statusCode, res) => {
  const sellerToken = seller.getJwtToken();

  console.log("sellerToken", sellerToken);

  //options for cokkie
  const option = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("seller_token", sellerToken, option).json({
    success: true,
    seller,
    sellerToken,
  });
};

module.exports = {
  createActivationToken,
  verifyToken,
  sendToken,
  sendShopToken,
};
