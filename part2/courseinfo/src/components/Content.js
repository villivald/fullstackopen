import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
