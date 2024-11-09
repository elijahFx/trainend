const jwt = require("jsonwebtoken");
require("dotenv").config()

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user; // Attach the user info to the request object
    next();
  });
}

module.exports = authenticateToken;
