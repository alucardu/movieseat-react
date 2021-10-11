// Apollo client resolvers

import {gql} from '@apollo/client';

const ReturnNotifications = gql`
  query returnNotifications {
    returnNotifications {
      returnNotifications {
        action
        id
        userId
        watched
        movie {
          original_title
        }
        followedUser {
          id
          user_name
        }
      }
      unwatchedNotificationsCount
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
        addUserToMovie {
          id
          original_title
          poster_path
          tmdb_id
          release_date
        }
        addedMovie {
          id
          original_title
          poster_path
          tmdb_id
          release_date
        }
      }
    }
`;

const WatchNotification = gql`
  mutation watchNotification(
    $notificationId: Int
  ) {
    watchNotification (
      notificationId: $notificationId
    ) {
      returnNotifications {
        action
        id
        watched
        movie {
          original_title
        }
        followedUser {
          id
          user_name
        }
      }
      unwatchedNotificationsCount
    }
  }
`;

const CreateNotification = gql`
  mutation createNotification(
    $action: String
    $followedUserId: Int
    $movieId: Int
    $userId: Int
  ) {
    createNotification (
      followedUserId: $followedUserId
      userId: $userId
      movieId: $movieId
      action: $action
    ) {
      returnNotifications {
        action
        followedUserId
        userId
        movieId
        watched
      }
      unwatchedNotificationsCount
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

const removeUserAccount = gql`
  mutation removeUserAccount (
    $userId: Int ) {
      removeUserAccount(
        userId: $userId
      )
    }
`;

const signupUser = gql`
  mutation signupUser(
    $email: String!
    $user_name: String!
    $password: String!) {
      signupUser(
        email: $email
        user_name: $user_name
        password: $password
      ) {
        email,
        id,
        user_name
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
const mutations = {removeUserAccount, RemoveMovie, LoginUser, LogoutUser, AddUserToMovie, FollowUser, UnfollowUser, CreateNotification, WatchNotification, signupUser};

export default {queries, mutations};
