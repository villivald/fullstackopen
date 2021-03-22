import React from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick} value={props.value}>
        Show
      </button>
    </>
  );
};

export default Button;
