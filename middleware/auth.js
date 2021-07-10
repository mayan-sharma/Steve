const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.send("Access Denied!");

  try {
    const decoded = jwt.verify(token, process.env.SECRET.toString());
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token!");
  }
};
