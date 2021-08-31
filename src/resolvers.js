const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {prisma} = require('./database.js');
const {decodedToken} = require('./decodedToken');

const Movie = {
  id: (parent) => parent.id,
  original_title: (parent) => parent.original_title,
  tmdb_id: (parent) => parent.tmdb_id,
  poster_path: (parent) => parent.poster_path,
};

const Query = {
  currentUser: async (root, args) => {
    const currentUser = await prisma.user.findUnique({
      where: {id: Number(args.id)},
    });
    return currentUser;
  },

  users: async (root, args, {prisma, req}) => {
    decodedToken(req);
    return prisma.user.findMany();
  },

  movie: () => {
    return prisma.movie;
  },
  movies: () => {
    return prisma.movie.findMany();
  },
};

const Mutation = {
  signupUser: async (root, args) => {
    const newUser = await prisma.user.create({
      data: {
        id: args.id,
        email: args.email,
        password: bcrypt.hashSync(args.password, 3),
        name: args.name,
      },
    });
    return {token: jwt.sign(newUser, 'supersecret')};
  },

  loginUser: async (root, args) => {
    const theUser = await prisma.user.findUnique({
      where: {email: String(args.email)},
    });
    if (!theUser) throw new Error('Unable to Login');
    const isMatch = bcrypt.compareSync(args.password, theUser.password);
    if (!isMatch) throw new Error('Unable to Login');
    return {token: jwt.sign(theUser, 'supersecret'), currentUser: theUser};
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
  removeAllUsers: () => {
    return prisma.user.deleteMany({});
  },
};

const resolvers = {Movie, Query, Mutation};

module.exports = {
  resolvers,
};
