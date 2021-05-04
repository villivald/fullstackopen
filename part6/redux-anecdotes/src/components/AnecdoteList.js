import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : state.anecdotes
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
    const voted = anecdotes.filter((a) => a.id === id);
    dispatch(showNotification(`You voted: ${voted[0].content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  const Anecdote = ({ anecdote }) => {
    return (
      <div className="anecdote">
        <div>{anecdote.content}</div>
        <div>
          Has <strong>{anecdote.votes}</strong>{" "}
          {anecdote.votes === 1 ? "vote" : "votes"}{" "}
          <button onClick={() => vote(anecdote.id)}>Vote</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Filter />
      {anecdotes
        .sort((min, max) => max.votes - min.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

export default AnecdoteList;
