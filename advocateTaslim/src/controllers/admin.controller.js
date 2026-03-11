import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const adminLogout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed"
    });
  }
};


export default 
{
  adminLogin,
  adminLogout 
  };

