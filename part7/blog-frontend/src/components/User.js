import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const User = ({ author }) => {
  if (!author) {
    return null;
  }
  return (
    <div>
      <h2>{author.username}</h2>
      {author.blogs.length !== 0 ? (
        <>
          <h3>Added blogs</h3>
          <List>
            {author.blogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemText primary={blog.title} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        "User has not created any blogs"
      )}
    </div>
  );
};

export default User;
