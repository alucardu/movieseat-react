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
        value
        movie {
          original_title
          id
        }
        followedUser {
          id
          user_name
        }
        user {
          id
          email
          user_name
        }
        movieRating {
          value
        }
      }
      unwatchedNotificationsCount
    }
  }
`;

const ReturnMovieDetails = gql`
  query returnMovieDetails($movieId: Int!) {
    returnMovieDetails(
        movieId: $movieId
      ) {
      id
      original_title
      poster_path
      tmdb_id
      release_date
      tagline
      backdrop_path
      runtime
      overview
      movieVideo {
        id
        name
        key
        site
        type
        official
      }
      movieRating {
        id
        movieId
        userId
        value
      }
      users {
        id
      }
    }
  }
`;

const ReturnAggregatedMovieRating = gql `
  query returnAggregatedMovieRating($movieId: Int!) {
    returnAggregatedMovieRating(movieId: $movieId)
  }
`;

const ReturnMovieRating = gql`
  query returnMovieRating(
    $movieId: Int!
    $userId: Int!) {
    returnMovieRating(
      movieId: $movieId
      userId: $userId) {
        id
        value
        userId
        movieId
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
  }
`;

const ReturnFollowedByUsers = gql`
  query returnFollowedByUsers($userId: Int) {
    returnFollowedByUsers(userId: $userId) {
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
  query moviesFromUser(
      $userId: Int!
      $filter: Boolean
    ) {
    moviesFromUser(
      userId: $userId
      filter: $filter
    ) {
      id
      original_title
      poster_path
      tmdb_id
      release_date
      tagline
      backdrop_path
      runtime
      overview
      users {
        id
      }
      movieVideo {
        id
        name
        key
        site
        type
        official
      }
      movieRating {
        id
        movieId
        userId
        value
      }
      users {
        id
      }
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
    $poster_path: String
    $release_date: String
    $runtime: Int
    $backdrop_path: String
    $tagline: String
    $overview: String
  ) {
    addUserToMovie (
      original_title: $original_title,
      tmdb_id: $tmdb_id,
      poster_path: $poster_path
      release_date: $release_date
      runtime: $runtime
      backdrop_path: $backdrop_path
      tagline: $tagline
      overview: $overview
    ) {
        addUserToMovie {
          id
          original_title
          poster_path
          tmdb_id
          release_date
          runtime
          backdrop_path
          tagline
          overview
        }
        addedMovie {
          id
          original_title
          poster_path
          tmdb_id
          release_date
          runtime
          backdrop_path
          tagline
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
          id
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
    $movieId: Int
    $movieRatingId: Int
    $userId: Int
  ) {
    createNotification (
      userId: $userId
      movieId: $movieId
      movieRatingId: $movieRatingId
      action: $action
    ) {
      returnNotifications {
        action
        userId
        movieId
        movieRatingId
        watched
      }
      unwatchedNotificationsCount
    }
  }
`;

const AddMovieRating = gql`
  mutation addMovieRating (
    $userId: Int
    $movieId: Int
    $id: Int
    $value: Int
  ) {
    addMovieRating (
      userId: $userId
      movieId: $movieId
      id: $id
      value: $value
    ) {
      userId
      movieId
      id
      value
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

const forgotPassword = gql`
  mutation forgotPassword (
    $email: String!
  ) {
    forgotPassword(
      email: $email
    )
  }
`;

const changePassword = gql`
  mutation changePassword(
    $password: String!
    $token: String!
  ) {
    changePassword (
      password: $password
      token: $token
    ) {
      email,
      id,
      user_name
    }
  }
`;

const activateUser = gql`
  mutation activateUser(
    $token: String!
  ) {
    activateUser (
      token: $token
    ) {
      email,
      id,
      user_name
    }
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

const queries = {ReturnAggregatedMovieRating, ReturnMovieDetails, ReturnMovieRating, ReturnAllMovies, ReturnMoviesFromUser, ReturnUser, returnUsers, ReturnFollowedUsers, ReturnFollowedByUsers, ReturnNotifications};
const mutations = {AddMovieRating, removeUserAccount, RemoveMovie, LoginUser, LogoutUser, AddUserToMovie, FollowUser, UnfollowUser, CreateNotification, WatchNotification, signupUser, forgotPassword, changePassword, activateUser};

export default {queries, mutations};
