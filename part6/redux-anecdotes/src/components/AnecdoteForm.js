import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";

    dispatch(createAnecdote(content));

    dispatch(showNotification(`New anecdote was added: ${content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="newAnecdote" />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
