// Apollo server resolvers

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {prisma} = require('./database.js');
const {decodedToken} = require('./decodedToken');

let currentUser;

const Query = {
  returnUser: async (_, args, {req}) => {
    if (req.userId) {
      return prisma.user.findUnique({
        where: {id: req.userId},
      });
    }
  },

  currentUser: async (root, args) => {
    currentUser = await prisma.user.findUnique({
      where: {id: Number(args.id)},
    });
    return currentUser;
  },

  moviesFromUser: async (root, args, {res, req}) => {
    if (req.userId) {
      const movies = await prisma.movie.findMany({
        where: {userId: args.userId},
      });
      return movies;
    }
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

  loginUser: async (_, args, {req, res}) => {
    const theUser = await prisma.user.findUnique({
      where: {email: String(args.email)},
    });
    if (!theUser) throw new Error('Unable to Login');
    const isMatch = bcrypt.compareSync(args.password, theUser.password);
    if (!isMatch) throw new Error('Unable to Login');

    const token = jwt.sign(theUser, 'supersecret');

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return theUser;
  },

  logoutUser: async (_, args, {req, res}) => {
    res.cookie('id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return true;
  },

  addMovie: async (parent, args, {req, res}) => {
    await prisma.movie.create({
      data: {
        original_title: args.original_title,
        tmdb_id: args.tmdb_id,
        poster_path: args.poster_path,
        userId: req.userId,
      },
    });
    return prisma.movie.findMany({where: {userId: req.userId}});
  },
  removeMovie: async (parent, args, {req, res}) => {
    await prisma.movie.delete({
      where: {id: Number(args.id)},
    });
    return prisma.movie.findMany({where: {userId: req.userId}});
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
