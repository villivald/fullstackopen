import React from "react";

const Total = (props) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      Number of exercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises +
        props.parts[3].exercises}
    </p>
  );
};

export default Total;
