const { ApolloServer, UserInputError, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const config = require("./config");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(born: YesNo): [Author!]!
    findAuthor(name: String!): Author
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: String!
      genres: [String]
    ): Book
    editBorn(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({});
    },
    allAuthors: (root, args) => {
      if (!args.born) {
        return Author.find({});
      }
      return Author.find({ born: { $exists: args.born === "YES" } });
    },
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments();
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };

      const currentAuthor = args.author;
      const authors = Author.findOne({ name: args.name });
      authors.length === 0 &&
        new Author({ name: currentAuthor, born: null, bookCount: 1 });

      const book = new Book(newBook);
      return book.save();
    },

    editBorn: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
