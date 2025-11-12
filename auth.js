// server/middlewares/auth.js
import jwt from "jsonwebtoken";

// Verify JWT and attach user to req
export const authMiddleware = (req, res, next) => {
  const raw = req.headers.authorization || "";
  const token = raw.startsWith("Bearer ") ? raw.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // decoded contains userId, role, etc.
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Admins only" });
};

// Check if user is freelancer
export const isFreelancer = (req, res, next) => {
  if (req.user && req.user.role === "freelancer") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Freelancers only" });
};
