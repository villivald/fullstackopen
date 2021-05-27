import React from "react";

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
    </div>
  );
};

export default CurrentBlog;
