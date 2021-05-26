import React from "react";

const User = ({ author }) => {
  if (!author) {
    return null;
  }
  return (
    <div>
      <h2>{author.username}</h2>
      {author.blogs.length !== 0 && (
        <>
          <h3>Added blogs</h3>
          <ul>
            {author.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default User;
