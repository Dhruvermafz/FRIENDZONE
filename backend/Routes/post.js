const express = require("express");
const { authVerify } = require("../Controllers/authController");
const {
  createPost,
  fetchPosts,
  addComment,
  toggleLike,
  toggleBookmark,
  sharePost,
  editPost,
  deletePost,
  reportPost,
} = require("../Controllers/postController");

const router = express.Router();

// Create Post
router.post("/create-post", authVerify, createPost);

// Fetch Posts
router.get("/fetch-post", authVerify, fetchPosts);

// Add Comment
router.post("/add-comment", authVerify, addComment);

// Toggle Like
router.post("/toggle-like/:postId", authVerify, toggleLike);

// Toggle Bookmark
router.post("/toggle-bookmark/:postId", authVerify, toggleBookmark);

// Share Post
router.post("/share-post/:postId", authVerify, sharePost);

// Edit Post
router.put("/edit-post/:postId", authVerify, editPost);

// Delete Post
router.delete("/delete-post/:postId", authVerify, deletePost);

// Report Post
router.post("/report-post/:postId", authVerify, reportPost);

module.exports.postRouter = router;
