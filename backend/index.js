const express = require("express");
const mongoose = require("mongoose");
const { User, Blog } = require("./models/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const secret = "123random";
const passwordHash=require("./utils/passwordHash");
const Auth = require("./middleware/auth");
const validateRequest = require("./middleware/validationCheck");
const { signInSchema, signUpSchema, blogZodSchema } = require("./models/types");
const generateSlug = require("./utils/generateSlug");
app.use(express.json());


async function ServerStart() {
  try {
    let connect = await mongoose.connect(
      "mongodb+srv://user123:tD4rUzrOZ0UwlGUI@cluster0.g0omesd.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    if (!connect) {
      console.log("Cannot connect to DB");
    } else {
      app.listen(3000, () => {
        console.log("server listening at port 3000");
      });
    }
  } catch (err) {
    console.log(err);
  }
}

app.post("/signup", validateRequest(signUpSchema), async (req, res) => {
  try {
    let { name, username, password } = req.body;
    let userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(401).json({ message: "User already Exists" });
    }
    let hashedPassword = await passwordHash(password);
    let user = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signin", validateRequest(signInSchema), async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "invalid username" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" });
    }
    let token = jwt.sign({username}, secret);
    res.json({ message: "signin successful", token: token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/createBlog", Auth, validateRequest(blogZodSchema), async (req, res) => {
    try {
      let { title, snippet, content } = req.body;
      let userId = req.user._id;
      let slug=await generateSlug(title, userId);
      let blog = new Blog({ title, snippet, content, userId, slug });
      await blog.save();
      res.json({ message: "blog added successfully", slug});
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get("/getblogs", Auth, async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", "username");
    res.json({ blogs: blogs });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/deleteBlog/:id", Auth, async (req, res) => {
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
});

app.get("/:username/:slug", Auth,async (req,res)=>{
  try{
    const {username,slug}=req.params;
    const user=await User.findOne({username:username});
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const blog=await Blog.findOne({userId:user._id,slug:slug}).populate("userId","username");
    console.log(blog);
    if(!blog){
      return res.status(404).json({message:"Blog not found"});
    }
    res.json({blog:blog});
  }catch(err){
     res.status(500).json({ message: "Internal Server Error" });
  }
});

ServerStart();
