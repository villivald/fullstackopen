import React from "react";
const Blog = ({ blog }) => (
  <div
    style={{
      marginBottom: "5px",
      paddingLeft: "2px",
    }}
  >
    <h4>{blog.title}</h4>
    {blog.author} - {blog.likes} - {blog.url}
  </div>
);

export default Blog;
