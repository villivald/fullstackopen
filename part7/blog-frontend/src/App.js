import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import registrationService from "./services/registration";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import RegistrationForm from "./components/RegistrationForm";
import Togglable from "./components/Togglable";

import { useDispatch } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  // EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const dispatch = useDispatch();

  // ADDING BLOG OBJECT
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    if (
      blogObject.title !== "" &&
      blogObject.author !== "" &&
      blogObject.url !== ""
    ) {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));

      dispatch(
        showNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} added`,
          5,
          "green"
        )
      );
    } else {
      dispatch(
        showNotification(
          "You must fill all fields in order to add a blog",
          5,
          "red"
        )
      );
    }
  };

  // UPDATE BLOG
  const blogUpdate = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject);

    const updatedBlog = { ...blogObject, blogId };

    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  // REMOVE BLOG
  const blogRemove = async (blogId) => {
    await blogService.remove(blogId);
    const thisBlog = blogs.filter((blog) => blog.id === blogId);
    setBlogs(blogs.filter((blog) => blog.id !== blogId));

    dispatch(
      showNotification(
        `Blog ${thisBlog[0].title} by ${thisBlog[0].author} was succesfully deleted`,
        5,
        "green"
      )
    );
  };

  // LOG IN & OUT
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
      dispatch(
        showNotification(`User ${user.username} is logged in`, 5, "green")
      );
    } catch (exception) {
      dispatch(showNotification("Wrong username or password", 5, "red"));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    document.location.reload();
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    const newUser = await registrationService.register({
      name,
      username,
      password,
    });
    dispatch(
      showNotification(
        `User ${newUser.username} was succesfully registered. Now you can log in.`,
        10,
        "green"
      )
    );
  };

  // FORMS
  const loginForm = () => (
    <Togglable buttonLabel="Log in" cancelButtonLabel="Cancel">
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
    <Togglable
      buttonLabel="New blog"
      cancelButtonLabel="Cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const registrationForm = () => (
    <Togglable buttonLabel="Register" cancelButtonLabel="Cancel">
      <RegistrationForm
        name={name}
        username={username}
        password={password}
        handleNameChange={({ target }) => setName(target.value)}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleRegistration}
      />
    </Togglable>
  );

  return (
    <div>
      <h1>Blogs</h1>

      {user && (
        <div className="log">
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <Notification />

      {!user && registrationForm()}

      {user === null ? (
        loginForm()
      ) : (
        <>
          {blogForm()}
          <div>
            {blogs
              .sort((min, max) => max.likes - min.likes)
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  blogUpdate={blogUpdate}
                  blogRemove={blogRemove}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
