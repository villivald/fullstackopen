import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NEW":
      return [...state, action.data];
    case "INIT":
      return action.data;
    case "VOTE": {
      return state.map((anecdote) =>
        anecdote.id !== action.data.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    }
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW",
      data: newAnecdote,
    });
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteFor(id);
    dispatch({
      type: "VOTE",
      data: votedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export default reducer;
