const User = require("../Model/userModel");
const { asyncHandler } = require("../Middlewares/asyncHandler");
const ErrorHandler = require("../Utils/ErrorHandler");
const generateToken = require("../Utils/jwtToken");

//register
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

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
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Requested User not Found", 400));
  }

  const isPasswordValid = await user.comparePassword(password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  generateToken(user, res);
  res.status(200).json({ success: true, user });
});

//logout
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "User logged out" });
});

//profile
const userProfile = asyncHandler(async (req, res, next) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json({ success: true, user });
});

//update profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
};
