import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const CommentForm = ({ createComment }) => {
  const [newComment, setNewComment] = useState("");

  // CHANGE HANDLERS
  const handleCommentChange = (event) => {
    console.log(event.target.value);
    setNewComment(event.target.value);
  };

  // CREATING Comment
  const addComment = (event) => {
    event.preventDefault();
    createComment(newComment.value);

    setNewComment("");
  };

  return (
    <div className="formDiv">
      <h3>Add a comment</h3>
      <form onSubmit={addComment}>
        <p>
          <input value={newComment} onChange={handleCommentChange} />
        </p>
        <Button type="submit" variant="contained" color="primary" size="small">
          Add
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
