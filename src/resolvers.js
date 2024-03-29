// Apollo server resolvers

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {prisma} = require('./database.js');
const msg = require('../server/email/sendMail');
const {v4: uuidv4} = require('uuid');
const lodash = require('lodash');
const dotenv = require('dotenv');

const followedUsers = async (args, req) => {
  const following = await prisma.user.findUnique({
    where: {id: req.userId || args.userId},
    select: {
      User_A: true,
    },
  });

  return following.User_A || [];
};

const followedBy = async (args, req) => {
  const followedBy = await prisma.user.findUnique({
    where: {id: req.userId},
    select: {
      User_B: true,
    },
  });

  return followedBy.User_B || [];
};

const returnUserNotifications = async (args, req) => {
  const notifications = await prisma.notification.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      AND: [
        {
          userId: {
            equals: req.userId,
          },
        },
        {
          followedUserId: {
            equals: null,
          },
        },
      ],
    },
    include: {
      movie: true,
      user: true,
      movieRating: true,
      followedUser: true,
    },
  });

  const notificationsX = await prisma.notification.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      followedUserId: {
        equals: req.userId,
      },

    },
    include: {
      movie: true,
      user: true,
      movieRating: true,
      followedUser: true,
    },
  });

  const unwatchedNotificationsCount = await prisma.notification.count({
    where: {
      AND: [
        {
          userId: {
            equals: req.userId,
          },
        },
        {
          followedUserId: {
            equals: null,
          },
        },
      ],
      watched: false,
    },
  });

  const unwatchedNotificationsCountX = await prisma.notification.count({
    where: {
      followedUserId: {
        equals: req.userId,
      },
      watched: false,
    },
  });

  let notificationsSorted = [...notifications, ...notificationsX];
  notificationsSorted = lodash.sortBy(notificationsSorted, ['id']).reverse();

  return {returnNotifications: notificationsSorted, unwatchedNotificationsCount: unwatchedNotificationsCount + unwatchedNotificationsCountX};
};

const returnMoviesFromUser = async (args, req, res) => {
  if (req.userId) {
    const movies = await prisma.movie.findMany({
      where: {
        users: {
          some: {
            id: {
              equals: args.userId,
            },
          },
        },
        // if filter is true then remove rated movies else return all movies
        ...(args.filter ? {movieRating: {
          none: {
            movieId: {
              gt: 0,
            },
          },
        }} : {}),
      },
      include: {
        movieVideo: true,
        movieRating: {
          where: {
            userId: req.userId,
          },
        },
      },
    });

    return movies || [];
  }
};

const Query = {
  returnNotifications: async (root, args, {res, req}) => {
    return await returnUserNotifications(args, req);
  },

  returnFollowedUsers: async (root, args, {res, req}) => {
    return await followedUsers(args, req);
  },

  returnFollowedByUsers: async (root, args, {res, req}) => {
    return await followedBy(args, req);
  },

  returnUser: async (_, args, {req}) => {
    if (args.userId || req.userId) {
      return prisma.user.findUnique({
        where: {id: args.userId || req.userId},
      });
    }
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

  returnMovieDetails: async (root, args, {res, req}) => {
    const movie = await prisma.movie.findFirst({
      where: {
        id: args.movieId,
      },
      include: {
        movieVideo: true,
        users: true,
        movieRating: {
          where: {
            userId: req.userId,
          },
        },
      },
    });
    return movie;
  },

  movies: () => {
    return prisma.movie.findMany();
  },

  returnMovieRating: async (_, args, {req}) => {
    return prisma.movieRating.findFirst({
      where: {
        userId: args.userId,
        movieId: args.movieId,
      },
    });
  },

  returnAggregatedMovieRating: async (_, args, {req, res}) => {
    const aggregatedRating = await prisma.movieRating.aggregate({
      _avg: {
        value: true,
      },
      where: {
        movieId: {
          equals: args.movieId,
        },
      },
    });

    return aggregatedRating._avg.value;
  },
};

const Mutation = {
  addMovieRating: async (_, args, {req, res}) => {
    const movieRating = await prisma.movieRating.upsert({
      where: {
        id: args.id || 0,
      },
      update: {
        value: args.value,
      },
      create: {
        value: args.value,
        user: {
          connect: {id: args.userId},
        },
        movie: {
          connect: {id: args.movieId},
        },
      },
    });

    return movieRating;
  },

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
        User_B: {
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
        User_A: {
          connect: {id: args.userId},
        },
      },
    });

    await prisma.user.update({
      where: {
        id: args.userId,
      },
      data: {
        User_B: {
          connect: {id: req.userId},
        },
      },
    });

    return followedUsers(args, req);
  },


  forgotPassword: async (root, args) => {
    const theUser = await prisma.user.findFirst({
      where: {
        email: String(args.email),
      },
    });

    if (!theUser) {
      return false;
    }

    const token = uuidv4();

    await prisma.user.update({
      where: {
        email: String(args.email),
      },
      data: {
        resetToken: token,
      },
    });

    const email = {
      from: '"moviese.at" <info@moviese.at>', // sender address
      to: args.email, // list of receivers
      subject: 'Password reset request', // Subject line
      // eslint-disable-next-line max-len
      html: `<b>If you have requested to change your password. Click <a href="${process.env.PUBLIC_URL}/user/change-password/${token}">here</a> to do so.</b>`, // html body
    };
    msg.main(email);

    return true;
  },

  changePassword: async (root, args, {req, res}) => {
    const theUser = await prisma.user.update({
      where: {
        resetToken: args.token,
      },
      data: {
        password: bcrypt.hashSync(args.password, 3),
        resetToken: null,
      },
    });

    if (!theUser) {
      return false;
    }

    const token = jwt.sign(theUser, 'supersecret');

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return theUser;
  },

  signupUser: async (root, args, {req, res}) => {
    const theUser = await prisma.user.findMany({
      where: {
        email: {
          contains: String(args.email),
          mode: 'insensitive',
        },
      },
    });

    if (theUser.length > 0) throw new Error('Email already in use');

    const theUserName = await prisma.user.findMany({
      where: {
        user_name: {
          contains: String(args.user_name),
          mode: 'insensitive',
        },
      },
    });

    if (theUserName.length > 0) throw new Error('Username already in use');

    const token = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        email: args.email,
        password: bcrypt.hashSync(args.password, 3),
        user_name: args.user_name,
        activationToken: token,
      },
    });

    const email = {
      from: '"moviese.at" <info@moviese.at>', // sender address
      to: args.email, // list of receivers
      subject: 'Activate account', // Subject line
      // eslint-disable-next-line max-len
      html: `<b>Click <a href="${process.env.HOST_URL}/user/activate-account/${token}">here</a> to activate your account.</b>`, // html body
    };
    msg.main(email);

    return newUser;
  },

  activateUser: async (_, args, {req, res}) => {
    const theUser = await prisma.user.update({
      where: {
        activationToken: args.token,
      },
      data: {
        activationToken: null,
      },
    });

    const token = jwt.sign(theUser, 'supersecret');

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return theUser;
  },

  loginUser: async (_, args, {req, res}) => {
    const theUser = await prisma.user.findUnique({
      where: {email: String(args.email)},
    });
    if (!theUser) throw new Error('Incorrect email address or password');
    const isMatch = bcrypt.compareSync(args.password, theUser.password);
    if (!isMatch) throw new Error('Incorrect email address or password');
    if (theUser.activationToken) throw new Error('Account has not been activated');

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
        followedBy.map(async (followedUser) => {
          await prisma.user.update({
            where: {id: args.userId},
            data: {
              notifications: {
                create: {
                  action: args.action,
                  movie: {
                    connect: {id: args.movieId},
                  },
                  followedUser: {
                    connect: {id: followedUser.id},
                  },
                },
              },
            },
          });
        });
      });
    }

    if (args.action === 'has rated') {
      await followedUsers(args, req).then((followedBy) => {
        followedBy.map(async (followedUser) => {
          await prisma.user.update({
            where: {id: args.userId},
            data: {
              notifications: {
                create: {
                  action: args.action,
                  movie: {
                    connect: {id: args.movieId},
                  },
                  followedUser: {
                    connect: {id: followedUser.id},
                  },
                  movieRating: {
                    connect: {id: args.movieRatingId},
                  },
                },
              },
            },
          });
        });
      });
    }

    if (args.action === 'Start following some users!') {
      await prisma.user.update({
        where: {id: args.userId},
        data: {
          notifications: {
            create: {
              action: args.action,
              followedUser: {
                connect: {id: args.userId},
              },
            },
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
        release_date: args.release_date,
        runtime: args.runtime,
        poster_path: args.poster_path,
        backdrop_path: args.backdrop_path,
        tagline: args.tagline,
        overview: args.overview,
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
    if (args.email) {
      await prisma.user.delete({
        where: {email: args.email},
      });
    }

    if (args.userId) {
      await prisma.notification.deleteMany({
        where: {
          userId: args.userId,
        },
      });
      await prisma.movieRating.deleteMany({
        where: {
          userId: args.userId,
        },
      });
      await prisma.user.delete({
        where: {id: args.userId},
      });
    }

    res.cookie('id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
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
