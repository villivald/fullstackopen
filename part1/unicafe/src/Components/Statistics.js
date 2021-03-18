import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {good + neutral + bad}</p>
      <p>Average {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive {(good / (good + neutral + bad)) * 100}%</p>
    </div>
  );
};

export default Statistics;
