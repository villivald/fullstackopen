import React from "react";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleNameChange,
  username,
  password,
  name,
}) => {
  return (
    <div>
      <h2>Registration</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          Login:
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
