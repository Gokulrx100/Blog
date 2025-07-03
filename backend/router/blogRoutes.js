const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validationCheck");
const { signInSchema, signUpSchema } = require("../models/types");
const Auth = require("../middleware/auth");
const { blogZodSchema } = require("../models/types");

const authController = require("../controllers/authController");
const blogController = require("../controllers/blogControllers");


router.post("/signup", validateRequest(signUpSchema), authController.signin);

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

module.exports = router;
