import express from "express";
import path from "path";
import cors from "cors";

import blogRoutes from "./routes/blog.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// CORS
app.use(cors({ origin: "*" }));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static admin panel
app.use("/public", express.static("public"));
app.use(express.static("public/advocateFrontend"));


// Admin pages
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/advocateFrontend/dashboard.html"));
});
app.get("/blogs", (req, res) => {
  res.sendFile(path.resolve("public/advocateFrontend/blogs.html"));
});
app.get("/addBlog", (req, res) => {
  res.sendFile(path.resolve("public/advocateFrontend/addBlog.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.resolve("public/advocateFrontend/signin.html"));
});


///ADMIN ROUTES
app.use("/api/admin", adminRoutes);


// API routes
app.use("/api/blogs", blogRoutes);
app.use("/api", uploadRoutes);



// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;
