import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, blogUpdate, blogRemove }) => {
  const likeHandler = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogUpdate(blog.id, updatedBlog);
  };
  const removeHandler = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) &&
      blogRemove(blog.id);
  };

  return (
    <div className="blog-container">
      <div>
        <strong>{blog.title} </strong>
        by
        <strong> {blog.author}</strong>
      </div>
      <Togglable buttonLabel="View" cancelButtonLabel="Hide">
        <p>Url: {blog.url}</p>
        <p>
          {blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`}
          <button onClick={likeHandler}>Like</button>
        </p>
        <p>User: {blog.user.username}</p>
        <button onClick={removeHandler}>Remove</button>
      </Togglable>
    </div>
  );
};
export default Blog;
