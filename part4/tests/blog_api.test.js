const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

// BEFORE EACH
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("when there is initially some blogs saved", () => {
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

  // SPECIFIC TITLE
  test("a specific title is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("My New Blog");
  });
});

describe("viewing a specific blog", () => {
  // UNIQUE ID
  test("blog has a unique id named 'id'", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
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

  // !BLOG -> 404
  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  // !ID -> 400
  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new blog", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const testUser = await new User({
      username: "Vladimir Lenin",
      passwordHash: await bcrypt.hash("karlmarxrules", 10),
    }).save();

    const userForToken = { username: "Vladimir Lenin", id: testUser.id };
    token = jwt.sign(userForToken, process.env.SECRET);
    return token;
  });
  // CAN ADD A NEW BLOG
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "A Brilliant Blog",
      author: "T.B Morgan",
      url: "bbg.net",
      likes: 1000,
      userId: "60744525b0fc3bc68325e172",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
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
      userId: "60744525b0fc3bc68325e172",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
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
      userId: "60744525b0fc3bc68325e172",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  // BLOG WITHOUT CONTENT -> 400
  test("blog without content is not added", async () => {
    const newBlog = { userId: "60744525b0fc3bc68325e172" };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const testUser = await new User({
      username: "Vladimir Lenin",
      passwordHash: await bcrypt.hash("karlmarxrules", 10),
    }).save();

    const userForToken = { username: "Vladimir Lenin", id: testUser.id };
    token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: "New Test Blog",
      author: "Vladimir Lenin",
      url: "villivald.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200);

    return token;
  });

  // CAN DELETE A BLOG
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(0);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("updating of a blog", () => {
  // CAN UPDATE A BLOG
  test("blog can be updated", async () => {
    const newBlog = {
      title: "A Brilliant Blog",
      author: "John Bon Jovi",
      url: "bbbblog.net",
      likes: 1000,
    };

    const initialBlogs = await helper.blogsInDb();
    const blogToUpdate = initialBlogs[0];
    // console.log(blogToUpdate);

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

    const blogsAfterUpdating = await helper.blogsInDb();

    const updatedBlog = blogsAfterUpdating[0];
    // console.log(updatedBlog);

    expect(blogsAfterUpdating).toHaveLength(helper.initialBlogs.length);

    expect(updatedBlog.likes).toBe(1000);
    expect(updatedBlog.author).toBe("John Bon Jovi");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
