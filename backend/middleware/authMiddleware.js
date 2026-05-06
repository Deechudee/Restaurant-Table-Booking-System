const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  protect,
  ownerOnly,
};

// ======================================
// Protect Routes
// ======================================
async function protect(req, res, next) {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    req.user = await User.findById(decoded.id).select(
      "-password"
    );

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

// ======================================
// Owner Only Access
// ======================================
function ownerOnly(req, res, next) {
  if (req.user.role !== "owner") {
    return res.status(403).json({
      message: "Only restaurant owners can access this route",
    });
  }

  next();
}