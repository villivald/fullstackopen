import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    // eslint-disable-next-line no-unused-vars
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0,
    });
  });

  test("neutral is incremented", () => {
    const action = {
      type: "NEUTRAL",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 1,
    });
  });

  test("reset button resets the state", () => {
    const action = {
      type: "ZERO",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  });
});
