const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Not So Popular Blog",
    author: "John",
    url: "crap_blog.com",
    likes: 10,
    id: "606da1e1fcd684120a2aaee3",
  },
  {
    title: "My New Blog",
    author: "MV",
    url: "blog.com",
    likes: 100,
    id: "606da211fcd684120a2aaee4",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Test Blog",
    author: "VIP",
    url: "google.com",
  });
  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
