const notFound = (req, res) => {
  res.status(404).json({ msg: "Requested route does not found" });
};

module.exports = notFound;
