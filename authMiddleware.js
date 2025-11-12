import jwt from "jsonwebtoken";

// ==============================
// ✅ Normal Authentication Check
// ==============================
export const authMiddleware = (req, res, next) => {
  // Token header se lena (Bearer <token>)
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ko request object me attach kar do
    req.user = decoded;

    next(); // Next middleware / route pe jao
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ==============================
// ✅ Admin Role Check
// ==============================
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied, Admin only" });
  }
  next();
};
