import {gql} from '@apollo/client';

const ReturnCurrentUser = gql`
  query currentUser($id: Int!) {
    currentUser(id: $id) {
      id
      email
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

const AddMovie = gql`
  mutation addMovie(
    $original_title: String!,
    $tmdb_id: Int!,
    $poster_path: String!
  ) {
      addMovie(
      original_title: $original_title,
      tmdb_id: $tmdb_id,
      poster_path: $poster_path
      ) {
        original_title
      }
    }
`;

const RemoveMovie = gql`
  mutation removeMovie(
    $id: Int!) {
    removeMovie(id: $id) {
      id
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
        token,
        currentUser {
          email
          id
        }
      }
    }
`;

const queries = {ReturnAllMovies, ReturnCurrentUser};
const mutations = {AddMovie, RemoveMovie, LoginUser};

export default {queries, mutations};
