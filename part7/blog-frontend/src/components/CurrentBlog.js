import React from "react";
import { v4 as uuidv4 } from "uuid";
import CommentForm from "./CommentForm";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const CurrentBlog = ({ blog, blogUpdate, createComment }) => {
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
      <Link href={`http://${blog.url}`}>{blog.url}</Link>
      <p className="likeContainer">
        {blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={likeHandler}
        >
          Like
        </Button>
      </p>
      <p>Added by {blog.user.username}</p>
      <Divider />
      <h2>Comments</h2>
      <CommentForm createComment={createComment} />
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={uuidv4()}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CurrentBlog;
