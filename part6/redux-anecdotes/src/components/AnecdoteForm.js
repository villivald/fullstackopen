import React from "react";
import { connect } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";

    props.createAnecdote(content);
    props.showNotification(`New anecdote was added: ${content}`, 5);
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

const mapDispatchToProps = { createAnecdote, showNotification };

export default connect(null, mapDispatchToProps)(AnecdoteForm);
