import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [toggle, setToggle] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStyle, setNotificationStyle] = useState("notification");

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    if (
      blogObject.title !== "" &&
      blogObject.author !== "" &&
      blogObject.url !== ""
    ) {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlogTitle("");
        setNewBlogAuthor("");
        setNewBlogUrl("");
      });

      setNotificationStyle("notification");
      setNotificationText(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    } else {
      setNotificationStyle("warning");
      setNotificationText("You must fill all fields in order to add a blog");
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    }
  };

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewBlogUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotificationStyle("notification");
      setNotificationText(`User ${user.username} is logged in`);
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    } catch (exception) {
      setNotificationStyle("warning");
      setNotificationText("Wrong username or password");
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    document.location.reload();
  };

  const loginForm = () => (
    <Togglable buttonLabel="Log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="New blog">
      <BlogForm
        onSubmit={addBlog}
        newBlogTitle={newBlogTitle}
        handleTitleChange={handleTitleChange}
        newBlogAuthor={newBlogAuthor}
        handleAuthorChange={handleAuthorChange}
        newBlogUrl={newBlogUrl}
        handleUrlChange={handleUrlChange}
      />
    </Togglable>
  );

  return (
    <div>
      <h1>Blogs</h1>
      {user && (
        <div className="log">
          {user.username} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {toggle && (
        <Notification text={notificationText} style={notificationStyle} />
      )}
      {user === null ? (
        loginForm()
      ) : (
        <>
          {blogForm()}
          <ul>
            {blogs
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
