import React from "react";
import { connect } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteForAnecdote(anecdote.id);
    props.showNotification(`You voted: ${anecdote.content}`, 5);
  };

  const Anecdote = ({ anecdote }) => {
    return (
      <div className="anecdote">
        <div>{anecdote.content}</div>
        <div>
          Has <strong>{anecdote.votes}</strong>{" "}
          {anecdote.votes === 1 ? "vote" : "votes"}{" "}
          <button onClick={() => vote(anecdote)}>Vote</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Filter />
      {props.anecdotes
        .sort((min, max) => max.votes - min.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
    };
  }
  return { anecdotes: state.anecdotes };
};

const mapDispatchToProps = { voteForAnecdote, showNotification };

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
