const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-token-auth");
  if (!token) {
    return res.status(401).send("Access dined......");
  }

  try {
    const decoded = jwt.verify(token, process.env.vidly_jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
