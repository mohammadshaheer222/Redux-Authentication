const notFound = (req, res) => {
  res.status(404).json({ msg: "Requires routed does not found" });
};

module.exports = notFound;
