import React from "react";

const BlogForm = ({
  onSubmit,
  newBlogTitle,
  handleTitleChange,
  newBlogAuthor,
  handleAuthorChange,
  newBlogUrl,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={onSubmit}>
        <p>
          Title: <input value={newBlogTitle} onChange={handleTitleChange} />
        </p>
        <p>
          Author: <input value={newBlogAuthor} onChange={handleAuthorChange} />
        </p>
        <p>
          Url: <input value={newBlogUrl} onChange={handleUrlChange} />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BlogForm;
