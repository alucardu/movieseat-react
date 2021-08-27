import {gql} from '@apollo/client';

const ReturnAllMovies = gql`
  {
    movies {
      id,
      name,
      poster_path
    }
  }
`;

export default {ReturnAllMovies};
