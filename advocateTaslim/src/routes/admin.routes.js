import express from "express";
import  adminController from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/auth.js";

const {adminLogin, adminLogout} = adminController;

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminAuth, adminLogout);

export default router;
