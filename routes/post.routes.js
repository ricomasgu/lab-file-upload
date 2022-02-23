const User = require("../models/User.model");
const Post = require("../models/Post.model");
const { isLoggedIn } = require("../middleware/route-guard");

const fileUploader = require('../config/cloudinary.config');

const router = require("express").Router();

/* GET home page */
router.get("/create", isLoggedIn, (_, res, next) => {
  res.render("posts/post-form");
});

router.post("/create", isLoggedIn, fileUploader.single("picPath"), async (req, res, next) => {
  const { content, picName } = req.body;
  const { username } = req.session.currentUser;
  const { _id: creatorId } = await User.findOne({ username });
  await Post.create({ content, creatorId, picPath: req.file.path, picName });
  res.redirect("/posts");
});

router.get("/posts", async (req, res, next) => {
  const posts = await Post.find();
  res.render("posts/posts", { user: req.session.currentUser, posts });
});

router.get("/posts/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/post-details", { user: req.session.currentUser, post });
});

module.exports = router;
