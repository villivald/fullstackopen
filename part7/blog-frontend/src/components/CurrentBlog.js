import React from "react";
import { v4 as uuidv4 } from "uuid";

const CurrentBlog = ({ blog, blogUpdate }) => {
  if (!blog) {
    return null;
  }
  const likeHandler = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogUpdate(blog.id, updatedBlog);
  };
  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <p className="likeContainer">
        {blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`}
        <button className="likeButton" onClick={likeHandler}>
          Like
        </button>
      </p>
      <p>Added by {blog.user.username}</p>
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={uuidv4()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentBlog;
