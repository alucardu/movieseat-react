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
    userId:         Int
    movie:          Movie
    movieId:        Int
    watched:        Boolean
  }

  type Query {
    returnNotifications: returnNotificationsPayload
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
    watchNotification (
      notificationId: Int
    ) : returnNotificationsPayload
  }

  type Mutation {
    removeUserAccount (
      email: String
      userId: Int
    ) : Boolean

    createNotification (
      action: String
      userId: Int
      followedUserId: Int
      movieId: Int
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
