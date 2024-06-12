const generateToken = (user, res) => {
  const token = user.getJwtToken();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, options);
};

module.exports = generateToken;
