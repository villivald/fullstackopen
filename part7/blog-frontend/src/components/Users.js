import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  const userData = users.map((user) => (
    <div
      key={user.id}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
      }}
    >
      <Link to={`/users/${user.id}`}>
        <p>{user.username}</p>
      </Link>
      <p>{user.blogs.length}</p>
    </div>
  ));

  return (
    <div>
      <h1>Users</h1>
      <div style={{ marginLeft: "20%" }}>
        <b>Blogs created</b>
      </div>
      <div>{userData}</div>
    </div>
  );
};

export default Users;
