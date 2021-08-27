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
    name: String!
    tmdb_id: Int!
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
  }

  type Mutation {
    registerStudent(
      email: String!, fullName: String!, dept: String, enrolled: Boolean
    ): Student!
    enroll(id: ID!): Student
    addMovie(
      name: String!, tmdb_id: Int!
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
