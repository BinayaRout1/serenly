import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token",
      });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY missing in .env");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized - Token invalid or expired",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("protectRoute error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};