import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteReducer from "./reducers/anecdoteReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
