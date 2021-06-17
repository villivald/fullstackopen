import { gql } from "@apollo/client";

export const authorsQuery = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const booksQuery = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $author: String!
    $published: String!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editBorn(name: $name, born: $born) {
      name
      born
    }
  }
`;
