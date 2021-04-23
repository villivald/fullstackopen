import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => (
  <div
    style={{
      border: "1px solid black",
      width: "250px",
      marginBottom: "10px",
      borderRadius: "5px",
      padding: "5px",
    }}
  >
    <div>
      <strong>{blog.title} </strong>
      by
      <strong> {blog.author}</strong>
    </div>
    <Togglable buttonLabel="View" cancelButtonLabel="Hide">
      <p>Url: {blog.url}</p>
      <p>
        Likes: {blog.likes}
        <button>Like</button>
      </p>
      <p>User: {blog.user.username}</p>
    </Togglable>
  </div>
);

export default Blog;
