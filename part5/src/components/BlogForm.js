import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  // CHANGE HANDLERS
  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewBlogUrl(event.target.value);
  };

  // CREATING BLOG OBJECT
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
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
