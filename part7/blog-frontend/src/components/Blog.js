import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, blogRemove }) => {
  const removeHandler = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) &&
      blogRemove(blog.id);
  };

  return (
    <div className="blog-container">
      <div className="blogTitle">
        <Link to={`/blogs/${blog.id}`}>
          <strong>{blog.title} </strong>
          by
          <strong> {blog.author}</strong>
        </Link>
      </div>

      <button onClick={removeHandler}>Remove</button>
    </div>
  );
};
export default Blog;
