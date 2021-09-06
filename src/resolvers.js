// Apollo server resolvers

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {prisma} = require('./database.js');

const returnMoviesFromUser = async (args, req) => {
  if (req.userId) {
    const user = await prisma.user.findMany({
      where: {id: args.userId},
      select: {
        movies: true,
      },
    });
    return user[0].movies;
  }
};

const Query = {
  returnUser: async (_, args, {req}) => {
    if (req.userId) {
      return prisma.user.findUnique({
        where: {id: req.userId},
      });
    }
  },

  moviesFromUser: async (root, args, {res, req}) => {
    return returnMoviesFromUser(args, req);
  },

  users: async (root, args, {prisma, req}) => {
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

  addUserToMovie: async (_, args, {req, res}) => {
    await prisma.movie.upsert({
      where: {
        tmdb_id: args.tmdb_id,
      },
      update: {
        users: {
          connect: [{id: req.userId}],
        },
      },
      create: {
        original_title: args.original_title,
        tmdb_id: args.tmdb_id,
        poster_path: args.poster_path,
        users: {
          connect: [{id: req.userId}],
        },
      },
    });

    return returnMoviesFromUser(args, req);
  },

  removeMovie: async (parent, args, {req, res}) => {
    await prisma.user.update({
      where: {id: req.userId},
      data: {
        movies: {
          disconnect: [{id: args.id}],
        },
      },
    });

    return returnMoviesFromUser(args, req);
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
