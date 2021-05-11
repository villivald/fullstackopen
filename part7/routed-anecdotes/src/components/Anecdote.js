import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.filter((anecdote) => anecdote.id === id);

  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      <h3>{anecdote[0].author}</h3>
      <div style={{ marginBottom: "10px" }}>{anecdote[0].content}</div>
      <div>
        More info <a href={anecdote[0].info}>{anecdote[0].info}</a>
      </div>
      <div style={{ marginBottom: "10px" }}>Has {anecdote[0].votes} votes</div>
    </div>
  );
};

export default Anecdote;
