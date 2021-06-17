import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: props.authorsQuery }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return props.fetchedAuthors.loading ? (
    "loading"
  ) : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.fetchedAuthors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          Name:
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Born:
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
