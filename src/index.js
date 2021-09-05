// entry point for the apollo server

const {PrismaClient} = require('@prisma/client');
const {ApolloServer} = require('apollo-server-express');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');
const cors = require('cors');
const prisma = new PrismaClient();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
// const port = process.env.PORT || 9090;

const startApolloServer = async () => {
  const app = express();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({req, res}) => ({
      req,
      res,
      prisma,
    }),
  });
  await server.start();

  const corsOptions = {
    origin: ['http://localhost:8080', 'https://studio.apollographql.com'],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(
      '/graphql',
      cookieParser(),
      (req, res, next) => {
        try {
          if (req.cookies.id) {
            const currentUser = jwt.verify(req.cookies.id, 'supersecret');
            req.userId = currentUser.id;
          }
          return next();
        } catch (err) {
          console.log(err);
        }
      },
  );
  app.use(express.urlencoded({
    extended: true,
  }));
  server.applyMiddleware({
    app, cors: corsOptions,
  });

  app.listen({port: 9090}, () =>
    console.log(`🚀 Server ready at http://localhost:9090${server.graphqlPath}`),
  );
};

startApolloServer();
