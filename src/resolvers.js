//* node-graphql/src/resolvers.js

const {prisma} = require('./database.js');

const Movie = {
  id: (parent) => parent.id,
  original_title: (parent) => parent.original_title,
  tmdb_id: (parent) => parent.tmdb_id,
  poster_path: (parent) => parent.poster_path,
};

const Query = {
  movie: () => {
    return prisma.movie;
  },
  movies: () => {
    return prisma.movie.findMany();
  },
};

const Mutation = {
  addMovie: (parent, args) => {
    return prisma.movie.create({
      data: {
        original_title: args.original_title,
        tmdb_id: args.tmdb_id,
        poster_path: args.poster_path,
      },
    });
  },
  removeMovie: (parent, args) => {
    return prisma.movie.delete({
      where: {id: Number(args.id)},
    });
  },
  removeAllMovies: () => {
    return prisma.movie.deleteMany({});
  },
};

const resolvers = {Movie, Query, Mutation};

module.exports = {
  resolvers,
};


// import {gql} from '@apollo/client';

// export const GET_LAUNCHES = gql`
//   query numberSix: () =>
// `;
