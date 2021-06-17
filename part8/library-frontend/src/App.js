import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { authorsQuery, booksQuery } from "./queries";
import Notify from "./components/Notify";

const App = () => {
  const fetchedAuthors = useQuery(authorsQuery);
  const fetchedBooks = useQuery(booksQuery);

  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === "authors"}
        fetchedAuthors={fetchedAuthors}
        authorsQuery={authorsQuery}
      />

      <Books show={page === "books"} fetchedBooks={fetchedBooks} />

      <NewBook
        show={page === "add"}
        authorsQuery={authorsQuery}
        booksQuery={booksQuery}
        setError={notify}
      />
    </div>
  );
};

export default App;
