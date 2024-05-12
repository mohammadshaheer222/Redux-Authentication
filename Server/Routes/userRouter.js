const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
} = require("../Controllers/userController");
const { protect } = require("../Middlewares/authMiddleware");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .patch(protect, updateUserProfile);

module.exports = router;
