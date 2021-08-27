import {gql} from '@apollo/client';

const ReturnAllMovies = gql`
  {
    movies {
      id,
      name
    }
  }
`;

export default {ReturnAllMovies};
