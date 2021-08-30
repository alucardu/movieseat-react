//* node-graphql/src/schema.js

const {gql} = require('apollo-server');

const typeDefs = gql`

  type User {
    name: String!
    email: String!
    password: String!
    id: Int
  }

  type Query {
    users: [User]
  }

  type Movie {
    id: ID!
    original_title: String!
    tmdb_id: Int!
    poster_path: String!
  }

  type BatchPayload {
    count: Int!
  }

  type Query {
    movie(id: ID!): Movie
    movies: [Movie!]!
  }

  type Query {
    users: [User]
  }

  input UserCreateInput {
    email: String!
    name: String!
    password: String!
  }
  
  input UserLoginInput {
    email: String!
    password: String!
  }

  type AuthPayLoad {
    token: String!
  }

  type Mutation {
    signupUser(
      id: Int!
      email: String!
      password: String!
      name: String!) : AuthPayLoad!

    loginUser(
      email: String!
      password: String!) : AuthPayLoad!

    addMovie(
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
    ): Movie!
    removeMovie(
      id: Int!
    ): Movie!
    removeAllMovies: BatchPayload
    removeAllUsers: BatchPayload
  }
`;

module.exports = {
  typeDefs,
};
