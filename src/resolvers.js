//* node-graphql/src/resolvers.js

const {prisma} = require('./database.js');

const Student = {
  id: (parent) => parent.id,
  email: (parent) => parent.email,
  fullName: (parent) => parent.fullName,
  dept: (parent) => parent.dept,
  enrolled: (parent) => parent.enrolled,
};

const Movie = {
  id: (parent) => parent.id,
  original_title: (parent) => parent.original_title,
  tmdb_id: (parent) => parent.tmdb_id,
  poster_path: (parent) => parent.poster_path,
};

const Query = {
  numberSix() {
    return 6;
  },
  enrollment: () => {
    return prisma.student.findMany({
      where: {enrolled: true},
    });
  },
  students: () => {
    return prisma.student.findMany({});
  },
  student: (parent, args) => {
    return prisma.student.findFirst({
      where: {id: Number(args.id)},
    });
  },
  movie: () => {
    return prisma.movie;
  },
  movies: () => {
    return prisma.movie.findMany();
  },
};

const Mutation = {
  registerStudent: (parent, args) => {
    return prisma.student.create({
      data: {
        email: args.email,
        fullName: args.fullName,
        dept: args.dept,
        enrolled: args.enrolled,
      },
    });
  },
  enroll: (parent, args) => {
    return prisma.student.update({
      where: {id: Number(args.id)},
      data: {
        enrolled: true,
      },
    });
  },
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

const resolvers = {Student, Movie, Query, Mutation};

module.exports = {
  resolvers,
};


// import {gql} from '@apollo/client';

// export const GET_LAUNCHES = gql`
//   query numberSix: () =>
// `;
