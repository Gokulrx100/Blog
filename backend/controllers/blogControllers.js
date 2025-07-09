const { Blog, User, Comment } = require("../models/schema");
const generateSlug = require("../utils/generateSlug");
const buildCommentTree=require("../utils/buildCommentTree");

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
    const blogs = await Blog.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json({ blogs: blogs });
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

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name username gmail profilePic likedBlogs"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const blogs = await Blog.find({ userId: user._id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json({ user: user, blogs: blogs });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, snippet, content } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    blog.title = title;
    blog.snippet = snippet;
    blog.content = content;
    await blog.save();
    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const likeBlog = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;

const userIdStr = userId.toString();
const blogIdStr = blogId.toString();


  const blog = await Blog.findById(blogId);
  const user = await User.findById(userId);

  if (!blog || !user) {
    return res.status(404).json({ message: "Not found" });
  }

  const alreadyLiked = blog.likes.map((id) => id.toString()).includes(userIdStr);

  if (alreadyLiked) {
    blog.likes = blog.likes.filter((id) => id.toString() !== userIdStr);
    user.likedBlogs = user.likedBlogs.filter((id) => id.toString() !== blogIdStr);
    await blog.save();
    await user.save();
    return res.json({ message: "unliked" });
  } else {
    blog.likes.push(userId);
    if (!user.likedBlogs.map((id) => id.toString()).includes(blogIdStr)) {
      user.likedBlogs.push(blogId);
    }
    await blog.save();
    await user.save();
    return res.json({ message: "liked" });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, parent } = req.body;
    const blogId = req.params.blogId;
    const userId = req.user._id;

    const comment = new Comment({
      blog: blogId,
      user: userId,
      content: content,
      parent: parent || null,
    });

    await comment.save();

    res.json({ comment: comment });
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

const getComments=async (req,res)=>{
  try{
    const blogId =req.params.blogId;
    const comments=await Comment.find({blog:blogId}).populate("user","username").sort({createdAt:1}).lean();

    const commentTree=buildCommentTree(comments);
    res.json({comments:commentTree});
  }catch(err){
    res.status(500).json({message:"Failed to fetch comments"});
  }
}

const deleteComment=async(req,res)=>{
  const commentId=req.params.id;

    await Comment.findByIdAndUpdate(commentId,{
      deleted:true
    });

    return res.json({message:"comment marked as deleted"});
}

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  getBlogBySlug,
  getUserDetails,
  updateBlog,
  likeBlog,
  addComment,
  getComments,
  deleteComment
};
