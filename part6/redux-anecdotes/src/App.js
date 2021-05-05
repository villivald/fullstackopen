import React, { useEffect } from "react";
import anecdoteService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
