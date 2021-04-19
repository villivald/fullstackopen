import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog,
      author: user.name,
      url: "google.com",
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog("");
    });
  };

  const handleBlogChange = (event) => {
    console.log(event.target.value);
    setNewBlog(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>{user.username} logged in</p>
            {blogForm()}
          </div>
          <ul>
            {blogs
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
