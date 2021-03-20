import React from "react";

const Total = ({ parts }) => {
  const arr = parts.map((part) => part.exercises);
  const total = arr.reduce((res, current) => res + current);
  return <p style={{ fontWeight: "bold" }}>Number of exercises {total}</p>;
};

export default Total;
