import Blog from "../models/blog.model.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";


// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { heading, short_description, long_description, date } = req.body;

    const newBlog = new Blog({
      heading,
      short_description,
      long_description,
      date,
      slug: slugify(req.body.heading, { lower: true }),
image: req.file ? `blogImages/${req.file.filename}` : null
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong creating blog" });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const existingBlog = await Blog.findById(req.params.id);

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete old image if new uploaded
    if (req.file && existingBlog.image) {
      const oldImagePath = path.join(process.cwd(), existingBlog.image);
      fs.unlink(oldImagePath, err => {
        if (err) console.log("Old image delete failed:", err.message);
      });
req.body.image = `blogImages/${req.file.filename}`;    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating blog" });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (deletedBlog.image) {
      const imagePath = path.join(process.cwd(), deletedBlog.image);
      fs.unlink(imagePath, err => {
        if (err) console.log("Image delete failed:", err.message);
      });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting blog" });
  }
};

// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSingleBlog = async (req, res) => {
  //  const blog = await Blog.findOne({slug : req.params.slug});
   const blog = await Blog.findById( req.params.id);
    res.json(blog);
};

const getSingleSlug = async (req, res) => {
   const blog = await Blog.findOne({slug : req.params.slug});
  //  const blog = await Blog.findById( req.params.id);
    res.json(blog);
};



export default {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleSlug
};
