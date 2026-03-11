import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    // ✅ Proper JWT verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = decoded.id;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default adminAuth;