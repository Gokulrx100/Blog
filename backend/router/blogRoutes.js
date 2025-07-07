const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validationCheck");
const { signInSchema, signUpSchema, blogZodSchema } = require("../models/types");
const Auth = require("../middleware/auth");

const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const authController = require("../controllers/authController");
const blogController = require("../controllers/blogControllers");


router.post("/signup",upload.single("image") , authController.signup);

router.post("/signin", validateRequest(signInSchema), authController.signin);

router.post(
  "/createBlog",
  Auth,
  validateRequest(blogZodSchema),
  blogController.createBlog
);

router.get("/getblogs", Auth, blogController.getBlogs);

router.delete("/deleteBlog/:id", Auth, blogController.deleteBlog);

router.get("/:username/:slug", Auth, blogController.getBlogBySlug);

router.get("/profile",Auth, blogController.getUserDetails);

router.put("/updateBlog/:id", Auth, blogController.updateBlog);

module.exports = router;
