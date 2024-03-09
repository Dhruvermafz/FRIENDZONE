const Post = require("../Models/postSchema");

const createPost = async (req, res) => {
  const { img, caption } = req.body;
  const loggedUser = req.user;

  if (!img && !caption) {
    return res.status(400).json({ error: "nothing provided for the post" });
  }

  try {
    const newPost = new Post({
      owner: loggedUser._id,
      content: {
        caption,
        pic: img,
      },
    });

    await newPost.save();
    return res.status(200).json({ message: newPost });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("owner", "-password");

    return res.json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addComment = async (req, res) => {
  const { comment, post } = req.body;
  const loggedUser = req.user;

  if (!comment) {
    return res.status(400).json({ error: "nothing to comment" });
  }

  try {
    const thisPost = await Post.findById(post._id);

    thisPost.comments.push({
      text: comment,
      postedBy: {
        _id: loggedUser._id,
        username: loggedUser.username,
        pic: loggedUser.pic,
      },
    });

    await thisPost.save();

    return res.json({ message: "comment added", thisPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const loggedUser = req.user;

  try {
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    const likedIndex = post.likes.findIndex(
      (like) => like.user.toString() === loggedUser._id.toString()
    );

    if (likedIndex === -1) {
      // User hasn't liked the post yet, so add a new like
      post.likes.unshift({ user: loggedUser._id });
    } else {
      // User already liked the post, so remove the like
      post.likes.splice(likedIndex, 1);
    }

    await post.save();

    return res.json({ message: "Like toggled successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const toggleBookmark = async (req, res) => {
  const { postId } = req.params;
  const loggedUser = req.user;

  try {
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already bookmarked the post
    const bookmarkedIndex = post.bookmarks.findIndex(
      (bookmark) => bookmark.user.toString() === loggedUser._id.toString()
    );

    if (bookmarkedIndex === -1) {
      // User hasn't bookmarked the post yet, so add a new bookmark
      post.bookmarks.unshift({ user: loggedUser._id });
    } else {
      // User already bookmarked the post, so remove the bookmark
      post.bookmarks.splice(bookmarkedIndex, 1);
    }

    await post.save();

    return res.json({ message: "Bookmark toggled successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sharePost = async (req, res) => {
  const { postId } = req.params;
  const loggedUser = req.user;

  try {
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Perform share operation here...

    return res.json({ message: "Post shared successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const editPost = async (req, res) => {
  const { postId } = req.params;
  const { caption, img } = req.body;
  const loggedUser = req.user;

  try {
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the logged in user is the owner of the post
    if (post.owner.toString() !== loggedUser._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this post" });
    }

    // Update post fields
    post.content.caption = caption;
    post.content.pic = img;

    await post.save();

    return res.json({ message: "Post edited successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const loggedUser = req.user;

  try {
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the logged in user is the owner of the post
    if (post.owner.toString() !== loggedUser._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    await post.remove();

    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const reportPost = async (req, res) => {
  const { postId } = req.params;

  try {
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Perform reporting logic here...

    return res.json({ message: "Post reported successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  fetchPosts,
  addComment,
  toggleLike,
  toggleBookmark,
  sharePost,
  editPost,
  deletePost,
  reportPost,
};
