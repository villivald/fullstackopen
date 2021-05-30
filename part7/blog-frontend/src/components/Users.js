import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Users = ({ users }) => {
  const userData = users.map((user) => (
    <ListItem key={user.id}>
      <Link to={`/users/${user.id}`}>
        <ListItemText primary={user.username} />
      </Link>
      <ListItemText
        primary={user.blogs.length}
        style={{ marginLeft: "100px", textAlign: "right" }}
      />
    </ListItem>
  ));

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <b>Blogs created</b>
      </div>
      <List>{userData}</List>
    </div>
  );
};

export default Users;
