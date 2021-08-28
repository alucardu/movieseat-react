//* node-graphql/src/schema.js

const {gql} = require('apollo-server');

const typeDefs = gql`

  type Student {
    id: ID!
    email: String!
    fullName: String!
    dept: String
    enrolled: Boolean
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
    enrollment: [Student!]
    students: [Student!]!
    student(id: ID!): Student
    movie(id: ID!): Movie
    movies: [Movie!]!
    numberSix: Int!
  }

  type Mutation {
    registerStudent(
      email: String!, fullName: String!, dept: String, enrolled: Boolean
    ): Student!
    enroll(id: ID!): Student
    addMovie(
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
    ): Movie!
    removeMovie(
      id: Int!
    ): Movie!
    removeAllMovies: BatchPayload
  }
`;

module.exports = {
  typeDefs,
};
