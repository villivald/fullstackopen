import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

const Blog = ({ blog, blogRemove }) => {
  const removeHandler = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) &&
      blogRemove(blog.id);
  };

  return (
    <Paper elevation={3} className="blog-container">
      <div className="blogTitle">
        <Link component={RouterLink} to={`/blogs/${blog.id}`}>
          <strong>{blog.title} </strong>
          by
          <strong> {blog.author}</strong>
        </Link>
      </div>

      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={removeHandler}
      >
        Remove
      </Button>
    </Paper>
  );
};
export default Blog;
