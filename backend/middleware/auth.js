const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "You are not authorized!" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, "my-secret-key");
    // console.log(decoded);
    req.user = decoded.user;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Not authorized!" });
  }
};
