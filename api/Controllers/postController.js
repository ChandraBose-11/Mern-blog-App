import { errorHandler } from "../Middleware/error.js";
import Post from "../Models/postModel.js";
import cloudinary from "../cloudinary.js";
import fs from "fs";

export const create = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  try {
    let imageUrl =
      "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local temp file
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      image: imageUrl,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Update Post
export const updatePost = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) return next(errorHandler(403, "Not allowed"));

  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "blog_images" });
      post.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;

    post.slug = post.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};


export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
    };
    const posts = await Post.find(query).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);
   if (req.query.slug) {
      // Single post by slug
      return res.status(200).json({ post: posts[0] || null });
    }
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};
// Get Single Post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Delete Post
export const deletepost = async (req, res, next) => {
  if (!req.user || (!req.user.isAdmin && req.user.id !== req.params.userId)) {
    return next(errorHandler(403, "Not allowed"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    next(error);
  }
};