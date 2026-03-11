import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({

    heading: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    long_description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

    image: {
        type: String,
    },

    slug: {
        type: String,
        unique: true,
    },
},
    { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
