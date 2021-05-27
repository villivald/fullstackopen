import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import registrationService from "./services/registration";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import RegistrationForm from "./components/RegistrationForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import CurrentBlog from "./components/CurrentBlog";

import { useDispatch } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const initialUsers = await userService.getAll();
      setUsers(initialUsers);
    };
    fetchData();
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

  const match = useRouteMatch("/users/:id");
  const author = match
    ? users.find((author) => author.id === match.params.id)
    : null;

  const matchBlog = useRouteMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <>
      <h1>Blogs</h1>
      {user && (
        <div className="log">
          {user.username} is logged in
          <button style={{ maxWidth: "60px" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <Notification />
      {!user && registrationForm()}

      <Switch>
        <Route path="/users/:id">
          <User author={author} />
        </Route>
        <Route path="/blogs/:id">
          <CurrentBlog blog={blog} blogUpdate={blogUpdate} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>

        <Route path="/">
          <div>
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
                      <Blog key={blog.id} blog={blog} blogRemove={blogRemove} />
                    ))}
                </div>
              </>
            )}
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
