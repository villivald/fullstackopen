import React from "react";

const Statistic = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  );
};

export default Statistic;
