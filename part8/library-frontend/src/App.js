import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const authorsQuery = gql`
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `;
  const booksQuery = gql`
    query {
      allBooks {
        title
        author
        published
      }
    }
  `;

  const fetchedAuthors = useQuery(authorsQuery);
  const fetchedBooks = useQuery(booksQuery);

  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} fetchedAuthors={fetchedAuthors} />

      <Books show={page === "books"} fetchedBooks={fetchedBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
