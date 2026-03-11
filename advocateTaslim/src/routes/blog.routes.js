import express from "express";


import uploadBlog from "../middlewares/blog.middleware.js";
import  adminAuth  from "../middlewares/auth.js";
import blogController from "../controllers/blog.controller.js"
const router = express.Router();
const { createBlog, updateBlog, deleteBlog, getAllBlogs, getSingleBlog, getSingleSlug } = blogController;

// Routes For CRUD operations

router.get("/", getAllBlogs); // Get all  BLOGS
router.get("/:id",adminAuth, getSingleBlog);
router.post("/",adminAuth, uploadBlog.single("image"), createBlog); // create a new Blog
router.put("/:id", adminAuth, uploadBlog.single("image"), updateBlog); // update a old Blog
router.delete("/:id",adminAuth, deleteBlog); // delete a old Blog

router.get("/slug/:slug", getSingleSlug);
export default router;
