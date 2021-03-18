import React, { useState } from "react";
import Statistics from "./Components/Statistics";
import Button from "./Components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: "flex" }}>
        <Button action={handleGoodClick} text="Good" />
        <Button action={handleNeutralClick} text="Neutral" />
        <Button action={handleBadClick} text="Bad" />
      </div>
      <h1>Statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

export default App;
