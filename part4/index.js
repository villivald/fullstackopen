// const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Blog = require("./models/blog");

app.use(cors());
app.use(express.json());

// MORGAN
morgan.token("content", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

// GET ALL BLOGS
app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// POST NEW BLOG
app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
