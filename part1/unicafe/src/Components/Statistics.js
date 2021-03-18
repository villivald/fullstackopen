import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <tr>
          <td>All</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(good - bad) / (good + neutral + bad)}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{(good / (good + neutral + bad)) * 100}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;
