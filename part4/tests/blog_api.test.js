const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

// BEFORE EACH
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

// ALL === JSON
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// RIGHT LENGTH
test("there are right amount of blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// UNIQUE ID
test("blog has a unique id named 'id'", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

// SPECIFIC TITLE
test("a specific title is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("My New Blog");
});

// CAN ADD A NEW BLOG
test("a valid blog can be added", async () => {
  const newBlog = {
    title: "A Brilliant Blog",
    author: "John Bon Jovi",
    url: "bbbblog.net",
    likes: 1000,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAfterAdding = await helper.blogsInDb();

  const contents = blogsAfterAdding.map((blog) => blog.title);
  expect(contents).toContain("A Brilliant Blog");

  expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1);
});

// IF NO LIKES IN REQUEST -> LIKES === 0
test("if request has no likes property likes are set to 0", async () => {
  const newBlog = {
    title: "A Poor Blog",
    author: "Ivan Da Marja",
    url: "toupper.case",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAfterAdding = await helper.blogsInDb();
  const likesOfAdedBlog = blogsAfterAdding[blogsAfterAdding.length - 1].likes;

  expect(likesOfAdedBlog).toBe(0);
});

// IF NO TITLE AND URL IN REQUEST, THEN 400
test("if request has no title and url properties -> 400 Bad Request", async () => {
  const newBlog = {
    author: "Ivan Da Marja",
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

// BLOG WITHOUT CONTENT -> 400
test("blog without content is not added", async () => {
  const newBlog = {};

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

// CAN VIEW SINGLE BLOG
test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(resultBlog.body).toEqual(processedBlogToView);
});

// CAN DELETE A BLOG
test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

afterAll(() => {
  mongoose.connection.close();
});
