import {gql} from '@apollo/client';

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

// mutation {
//   addMovie (
//     original_title: "Dune"
//     tmdb_id: 2
//     poster_path: "cDbNAY0KM84cxXhmj8f0dLWza3t.jpg"
//   ) {
//     original_title
//   }
// }

const RemoveMovie = gql`
  mutation removeMovie($id: Int!) {
    removeMovie(id: $id) {
      id
    }
  }
`;

const queries = {ReturnAllMovies};
const mutations = {AddMovie, RemoveMovie};

export default {queries, mutations};
