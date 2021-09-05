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
    userId: Int!
  }

  type BatchPayload {
    count: Int!
  }

  type Query {
    returnUser: User
  }

  type Query {
    currentUser (id: Int!): User
  }

  type Query {
    moviesFromUser (userId: Int!): [Movie]
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
    currentUser: User! 
  }

  type Mutation {
    signupUser(
      id: Int!
      email: String!
      password: String!
      name: String!) : Boolean!

    loginUser(
      email: String!
      password: String!) : User!

    logoutUser: Boolean!

    addUserToMovie (
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
    ) : [Movie]

    addMovie(
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
    ): [Movie]
    
    removeMovie(
      id: Int!
    ): [Movie]
    removeAllMovies: BatchPayload
    removeAllUsers: BatchPayload
  }
`;

module.exports = {
  typeDefs,
};
