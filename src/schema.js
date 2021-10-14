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

  type MovieRating {
    value: Int
  }

  type Query {
    returnUsers: [User]
  }

  type notification {
    id: ID!
    followedUserId: Int
    userId: Int
    movieId: Int
    action: String
    watched: Boolean
  }

  type Movie {
    id: Int!
    original_title: String!
    tmdb_id: Int!
    poster_path: String!
    backdrop_path: String!
    runtime: String!
    tagline: String!
    overview: String!
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

  type returnNotificationsPayload {
    returnNotifications: [notificationPayload]
    unwatchedNotificationsCount: Int
  }

  type notificationPayload {
    id:             Int
    action:         String
    followedUser:   User
    followedUserId: Int
    user:           User
    userId:         Int
    movie:          Movie
    movieId:        Int
    watched:        Boolean
    movieRating:    MovieRating
    movieRatingId:  Int
  }

  type Query {
    returnNotifications: returnNotificationsPayload
  }

  type Query {
    moviesFromUser (
      userId: Int!): [Movie]
  }

  type Query {
    returnMovieRating (
      id: Int
      userId: Int!
      movieId: Int!): movieRatingPayload
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
    watchNotification (
      notificationId: Int
    ) : returnNotificationsPayload
  }

  type movieRatingPayload {
    userId:       Int
    movieId:      Int
    id:           Int
    value:        Int
  }

  type Mutation {
    removeUserAccount (
      email: String
      userId: Int
    ) : Boolean

    addMovieRating (
      userId: Int
      movieId: Int
      id: Int
      value: Int
    ) : movieRatingPayload

    createNotification (
      action: String
      userId: Int
      followedUserId: Int
      movieId: Int
      movieRatingId: Int
    ): returnNotificationsPayload

    followUser(
      userId: Int
    ) : [User]

    signupUser(
      email: String!
      password: String!
      user_name: String!) : User!

    loginUser(
      email: String!
      password: String!) : User!

    logoutUser: Boolean!

    addUserToMovie (
      original_title: String!, 
      tmdb_id: Int!,
      poster_path: String!
      release_date: String!
      runtime: Int!
      tagline: String!
      backdrop_path: String!
      overview: String!
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
