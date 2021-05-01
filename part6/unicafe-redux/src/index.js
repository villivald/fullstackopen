import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const neutral = () => {
    store.dispatch({
      type: "NEUTRAL",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good </div>
      <div>neutral </div>
      <div>bad </div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
