//* node-graphql/src/schema.js

const {gql} = require('apollo-server');

const typeDefs = gql`

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

  type Mutation {
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
