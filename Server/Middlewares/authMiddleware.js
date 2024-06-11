const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler");
const { asyncHandler } = require("./asyncHandler");
const User = require("../Model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Not authorized, no token", 401));
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();

  } catch (error) {
    return next(new ErrorHandler("Not authorized, invalid token", 401));
  }
});

module.exports = { protect };
