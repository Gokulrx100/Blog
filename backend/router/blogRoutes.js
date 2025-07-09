const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validationCheck");
const { signInSchema, blogZodSchema } = require("../models/types");
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

router.post("/comments/:blogId", Auth, blogController.addComment);

router.get("/comments/:blogId", Auth, blogController.getComments);

router.delete("/comments/:id", Auth, blogController.deleteComment);


router.get("/getblogs", Auth, blogController.getBlogs);

router.delete("/deleteBlog/:id", Auth, blogController.deleteBlog);

router.get("/:username/:slug", Auth, blogController.getBlogBySlug);

router.get("/profile",Auth, blogController.getUserDetails);

router.put("/updateBlog/:id", Auth, blogController.updateBlog);

router.post("/like/:id",Auth,blogController.likeBlog);

module.exports = router;
