import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <Statistic text="Good" value={good} />
      <Statistic text="Neutral" value={neutral} />
      <Statistic text="Bad" value={bad} />
      <p>All {good + neutral + bad}</p>
      <p>Average {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive {(good / (good + neutral + bad)) * 100}%</p>
    </div>
  );
};

export default Statistics;
