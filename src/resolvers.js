// Apollo server resolvers

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {prisma} = require('./database.js');
const {decodedToken} = require('./decodedToken');

let currentUser;

const Query = {
  currentUser: async (root, args) => {
    currentUser = await prisma.user.findUnique({
      where: {id: Number(args.id)},
    });
    return currentUser;
  },

  moviesFromUser: async (root, args) => {
    const movie = await prisma.movie.findMany({
      where: {userId: args.userId},
    });
    return movie;
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

  addMovie: async (parent, args, context) => {
    await prisma.movie.create({
      data: {
        original_title: args.original_title,
        tmdb_id: args.tmdb_id,
        poster_path: args.poster_path,
        userId: args.userId,
      },
    });
    return prisma.movie.findMany({where: {userId: context.user.id}});
  },
  removeMovie: async (parent, args, context) => {
    await prisma.movie.delete({
      where: {id: Number(args.id)},
    });
    return prisma.movie.findMany({where: {userId: context.user.id}});
  },
  removeAllMovies: () => {
    return prisma.movie.deleteMany({});
  },
  removeAllUsers: () => {
    return prisma.user.deleteMany({});
  },
};

const resolvers = {Query, Mutation};

module.exports = {
  resolvers,
};
