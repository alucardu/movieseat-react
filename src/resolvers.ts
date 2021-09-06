// Apollo client resolvers

import {gql} from '@apollo/client';

const ReturnUser = gql`
  query returnUser {
    returnUser {
      id
      email
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
  ) {
    addUserToMovie (
      original_title: $original_title,
      tmdb_id: $tmdb_id,
      poster_path: $poster_path
    ) {
        id
        original_title
        poster_path
        tmdb_id
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
        id
      }
    }
`;

const LogoutUser = gql`
    mutation logoutUser {
      logoutUser 
    }
`;

const queries = {ReturnAllMovies, ReturnMoviesFromUser, ReturnUser};
const mutations = {RemoveMovie, LoginUser, LogoutUser, AddUserToMovie};

export default {queries, mutations};
