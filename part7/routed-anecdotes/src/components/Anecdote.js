const Anecdote = ({ anecdote }) => {
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      <h3>{anecdote.author}</h3>
      <div style={{ marginBottom: "10px" }}>{anecdote.content}</div>
      <div>
        More info <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <div style={{ marginBottom: "10px" }}>Has {anecdote.votes} votes</div>
    </div>
  );
};

export default Anecdote;
