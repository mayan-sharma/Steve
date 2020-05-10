const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.send("Access Denied!");

  try {
    const decoded = jwt.verify(token, "secretForNow");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token!");
  }
};
