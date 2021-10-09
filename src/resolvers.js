// Apollo server resolvers

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {prisma} = require('./database.js');

const followedUsers = async (args, req) => {
  const following = await prisma.user.findUnique({
    where: {id: req.userId || args.userId},
    select: {
      following: true,
    },
  });

  return following.following;
};

const followedBy = async (args, req) => {
  const followedBy = await prisma.user.findUnique({
    where: {id: req.userId},
    select: {
      followedBy: true,
    },
  });

  return followedBy.followedBy;
};

const returnUserNotifications = async (args, req) => {
  const user = await prisma.user.findUnique({
    where: {id: req.userId},
    include: {
      notifications: {
        orderBy: {
          id: 'desc',
        },
        include: {
          movie: true,
          followedUser: true,
        },
      },
    },
  });

  const unwatchedNotificationsCount = await prisma.notification.count({
    where: {
      userId: req.userId,
      watched: false,
    },
  });

  return {returnNotifications: user.notifications, unwatchedNotificationsCount};
};

const returnMoviesFromUser = async (args, req) => {
  if (req.userId) {
    const user = await prisma.user.findUnique({
      where: {id: args.userId || req.userId},
      select: {
        movies: true,
      },
    });
    return user.movies;
  }
};

const Query = {
  returnNotifications: async (root, args, {res, req}) => {
    return await returnUserNotifications(args, req);
  },

  returnFollowedUsers: async (root, args, {res, req}) => {
    return await followedUsers(args, req);
  },

  returnFollowedBy: async (root, args, {res, req}) => {
    return await followedBy(args, req);
  },

  returnUser: async (_, args, {req}) => {
    return prisma.user.findUnique({
      where: {id: args.userId || req.userId},
    });
  },

  moviesFromUser: async (root, args, {res, req}) => {
    return returnMoviesFromUser(args, req);
  },

  returnUsers: async (root, args, {prisma, req}) => {
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
  watchNotification: async (_, args, {req, res}) => {
    await prisma.notification.update({
      where: {id: args.notificationId},
      data: {
        watched: true,
      },
    });

    return returnUserNotifications(args, req);
  },

  unfollowUser: async (_, args, {req, res}) => {
    await prisma.user.update({
      where: {id: req.userId},
      data: {
        following: {
          disconnect: [{id: args.id}],
        },
      },
    });

    return followedUsers(args, req);
  },

  followUser: async (_, args, {req, res}) => {
    await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        following: {
          connect: {id: args.userId},
        },
      },
    });

    await prisma.user.update({
      where: {
        id: args.userId,
      },
      data: {
        followedBy: {
          connect: {id: req.userId},
        },
      },
    });

    return followedUsers(args, req);
  },

  signupUser: async (root, args, {req, res}) => {
    const theUser = await prisma.user.findUnique({
      where: {email: String(args.email)},
    });

    if (theUser) throw new Error('Email already in use');

    const theUserName = await prisma.user.findUnique({
      where: {user_name: String(args.user_name)},
    });

    if (theUserName) throw new Error('Username already in use');

    const newUser = await prisma.user.create({
      data: {
        email: args.email,
        password: bcrypt.hashSync(args.password, 3),
        user_name: args.user_name,
      },
    });

    const token = jwt.sign(newUser, 'supersecret');

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return newUser;
  },

  loginUser: async (_, args, {req, res}) => {
    const theUser = await prisma.user.findUnique({
      where: {email: String(args.email)},
    });
    if (!theUser) throw new Error('Incorrect email address or password');
    const isMatch = bcrypt.compareSync(args.password, theUser.password);
    if (!isMatch) throw new Error('Incorrect email address or password');

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


  createNotification: async (_, args, {req, res}) => {
    if (args.action === 'has added') {
      await followedUsers(args, req).then((followedBy) => {
        followedBy.map(async (user) => {
          await prisma.user.update({
            where: {id: user.id},
            data: {
              notifications: {
                create: {
                  action: args.action,
                  movie: {
                    connect: {id: args.movieId},
                  },
                  followedUser: {
                    connect: {id: args.followedUserId},
                  },
                },
              },
            },
          });
        });
      });
    }

    if (args.action === 'Start following some users!') {
      await prisma.notification.create({
        data: {
          action: args.action,
          user: {
            connect: {id: args.userId},
          },
        },
      });
    }

    return await returnUserNotifications(args, req);
  },

  addUserToMovie: async (_, args, {req, res}) => {
    const addedMovie = await prisma.movie.upsert({
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
        release_date: args.release_date,
        users: {
          connect: [{id: req.userId}],
        },
      },
    });

    return {addUserToMovie: returnMoviesFromUser(args, req), addedMovie};
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

  removeUserAccount: async (parent, args, {req, res}) => {
    await prisma.user.delete({
      where: {id: args.userId},
    });

    return true;
  },

  removeAllUsers: () => {
    return prisma.user.deleteMany({});
  },
};

const resolvers = {Query, Mutation};

module.exports = {
  resolvers,
};
