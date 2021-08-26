//* node-graphql/src/resolvers.js

const {prisma} = require('./database.js');

const Student = {
  id: (parent, args, context, info) => parent.id,
  email: (parent) => parent.email,
  fullName: (parent) => parent.fullName,
  dept: (parent) => parent.dept,
  enrolled: (parent) => parent.enrolled,
};

const Movie = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  tmdb_id: (parent) => parent.tmdb_id,
};

const Query = {
  enrollment: (parent, args) => {
    return prisma.student.findMany({
      where: {enrolled: true},
    });
  },
  students: (parent, args) => {
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
    return prisma.movie.findMany({});
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
        name: args.name,
        tmdb_id: args.tmdb_id,
      },
    });
  },
  removeMovie: (parent, args) => {
    return prisma.movie.delete({
      where: {id: Number(args.id)},
    });
  },
};

const resolvers = {Student, Movie, Query, Mutation};

module.exports = {
  resolvers,
};
