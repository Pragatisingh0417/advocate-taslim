import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.model.js";

dotenv.config({ path: '../.env' });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Atlas URI
    console.log("MongoDB connected to Atlas");

    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists in Atlas");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully in Atlas");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to Atlas:", error);
    process.exit(1);
  }
};

createAdmin();
