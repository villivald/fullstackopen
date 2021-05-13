import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/index";

const CreateNew = (props) => {
  const history = useHistory();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "21px",
            marginBottom: "10px",
          }}
        >
          Content:{" "}
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "26px",
            marginBottom: "10px",
          }}
        >
          Author:{" "}
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "50px",
            marginBottom: "10px",
          }}
        >
          Url:{" "}
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>

        <button style={{ marginBottom: "10px" }}>Create</button>
      </form>
    </div>
  );
};

export default CreateNew;
