import React, { useState, useEffect } from "react";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const initialUsers = await userService.getAll();
      setUsers(initialUsers);
    };
    fetchData();
  }, []);

  const userData = users.map((user) => (
    <div
      key={user.id}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
      }}
    >
      <p>{user.username}</p>
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
