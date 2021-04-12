const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// GET ALL BLOGS
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

// GET SINGLE BLOG
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// ADD NEW BLOG
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

// DELETE A BLOG
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// UPDATE A BLOG
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    return response.status(404).end();
  }
});

module.exports = blogsRouter;
