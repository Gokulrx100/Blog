const { Blog, User } = require("../models/schema");
const generateSlug = require("../utils/generateSlug");

const createBlog = async (req, res) => {
  try {
    let { title, snippet, content } = req.body;
    let userId = req.user._id;
    let slug = await generateSlug(title, userId);
    let blog = new Blog({ title, snippet, content, userId, slug });
    await blog.save();
    res.json({ message: "blog added successfully", slug });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", "username");
    res.json({ blogs: blogs.reverse() });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not Found" });
    }
    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Blog.findByIdAndDelete(blogId);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { username, slug } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const blog = await Blog.findOne({ userId: user._id, slug: slug }).populate(
      "userId",
      "username"
    );
    console.log(blog);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ blog: blog });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  getBlogBySlug,
};
