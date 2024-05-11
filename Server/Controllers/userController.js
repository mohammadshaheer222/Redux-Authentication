const User = require("../Model/userModel");
const { asyncHandler } = require("../Middlewares/asyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");
const generateToken = require("../Utils/jwtToken");

//register
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("User already exist", 400));
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    return next(new ErrorHandler("Invalid User Data"));
  }

  generateToken(user, res);
  res.status(201).json({ success: true, user });
});

//login
const authUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Auth User" });
});

module.exports = { registerUser, authUser };
