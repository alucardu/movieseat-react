// Apollo client resolvers

import {gql} from '@apollo/client';

const ReturnNotifications = gql`
  query returnNotifications {
    returnNotifications {
      watched
      message
      id
      followedUser {
        id
      }
    }
  }
`;

const returnUsers = gql`
  query returnUsers {
    returnUsers {
      id
      email
      user_name
    }
  }
`;

const ReturnFollowedUsers = gql`
  query returnFollowedUsers($userId: Int) {
    returnFollowedUsers(userId: $userId) {
      id
      email
      user_name
    }
    returnFollowedBy(userId: $userId) {
      id
      email
      user_name
    }
  }
`;

const ReturnUser = gql`
  query returnUser($userId: Int) {
    returnUser(userId: $userId) {
      id
      email
      user_name
    }
  }
`;

const ReturnMoviesFromUser = gql`
  query moviesFromUser($userId: Int!) {
    moviesFromUser(userId: $userId) {
      id
      original_title
      poster_path
      tmdb_id
      release_date
    }
  }
`;

const ReturnAllMovies = gql`
  query ReturnAllMovies {
     movies {
       id
       original_title
       poster_path
       tmdb_id
     }
  }
`;

const AddUserToMovie = gql`
  mutation addUserToMovie(
    $original_title: String!,
    $tmdb_id: Int!,
    $poster_path: String!
    $release_date: String!
  ) {
    addUserToMovie (
      original_title: $original_title,
      tmdb_id: $tmdb_id,
      poster_path: $poster_path
      release_date: $release_date
    ) {
        id
        original_title
        poster_path
        tmdb_id
        release_date
      }
    }
`;

const CreateNotification = gql`
  mutation createNotification(
    $message: String
    $actor_id: Int
    $movie_id: Int
  ) {
    createNotification (
      actor_id: $actor_id
      movie_id: $movie_id
      message: $message
    ) {
      message
      actor_id
      movie_id
    }
  }
`;

const UnfollowUser = gql`
    mutation unfollowUser(
      $id: Int
    ) {
      unfollowUser (
        id: $id
      ) {
        id
        user_name
        email
      }
    }
`;

const RemoveMovie = gql`
  mutation removeMovie(
    $id: Int!
  ) {
    removeMovie(
      id: $id
    ) {
        id
        original_title
        poster_path
        tmdb_id
        release_date
    }
  }
`;

const FollowUser = gql`
  mutation followUser(
    $userId: Int
  ) {
    followUser(
      userId: $userId
    ) {
      id
      user_name
      email
    }
  }
`;

const LoginUser = gql`
  mutation loginUser(
    $email: String!
    $password: String!) {
      loginUser(
        email: $email
        password: $password
      ) {
        email,
        id,
        user_name
      }
    }
`;

const LogoutUser = gql`
    mutation logoutUser {
      logoutUser 
    }
`;

const queries = {ReturnAllMovies, ReturnMoviesFromUser, ReturnUser, returnUsers, ReturnFollowedUsers, ReturnNotifications};
const mutations = {RemoveMovie, LoginUser, LogoutUser, AddUserToMovie, FollowUser, UnfollowUser, CreateNotification};

export default {queries, mutations};
