//* node-graphql/src/schema.js

const {gql} = require('apollo-server');

const typeDefs = gql`

  type User {
    name: String!
    email: String!
    password: String!
    user_name: String!
    id: Int
  }

  type Query {
    returnUsers: [User]
  }

  type notification {
    id: ID!
    followedUserId: Int
    movie_id: Int
    action: String
  }

  type Movie {
    id: Int!
    original_title: String!
    tmdb_id: Int!
    poster_path: String!
    release_date: String!
  }

  type BatchPayload {
    count: Int!
  }

  type Query {
    returnFollowedUsers (userId: Int): [User]
    returnFollowedBy (userId: Int): [User]
  }

  type Query {
    returnUser(userId: Int): User
  }

  type notificationPayload {
    id:             Int
    action:         String
    followedUser:   User
    movie:          Movie
    watched:        Boolean
  }

  type Query {
    returnNotifications: [notificationPayload]
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

  type AddedMoviePayload {
    addUserToMovie: [Movie]
    addedMovie: Movie
  }

  type AuthPayLoadToken {
    token: String!
  }

  type Mutation {
    createNotification (
      action: String
      followedUserId: Int
      movie_id: Int
    ): notificationPayload 

    followUser(
      userId: Int
    ) : [User]

    signupUser(
      id: Int!
      email: String!
      password: String!
      name: String!
      user_name: String!) : AuthPayLoadToken

    loginUser(
      email: String!
      password: String!) : User!

    logoutUser: Boolean!

    addUserToMovie (
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
      release_date: String!
    ) : AddedMoviePayload

    addMovie(
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
      release_date: String!
    ): [Movie]

    unfollowUser (
      id: Int
    ) : [User]
    
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
