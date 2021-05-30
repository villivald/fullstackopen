import React, { useState } from "react";
import Button from "@material-ui/core/Button";

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
    <div className="formDiv">
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <p>
          Title:{" "}
          <input
            id="titleInput"
            value={newBlogTitle}
            onChange={handleTitleChange}
            className="titleInput"
          />
        </p>
        <p>
          Author:{" "}
          <input
            id="authorInput"
            value={newBlogAuthor}
            onChange={handleAuthorChange}
            className="authorInput"
          />
        </p>
        <p>
          Url:{" "}
          <input
            id="urlInput"
            value={newBlogUrl}
            onChange={handleUrlChange}
            className="urlInput"
          />
        </p>

        <Button
          variant="contained"
          color="primary"
          id="newBlogButton"
          type="submit"
          style={{ marginBottom: "10px" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
