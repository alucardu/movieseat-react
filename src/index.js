// entry point for the apollo server

const {PrismaClient} = require('@prisma/client');
const {ApolloServer} = require('apollo-server-express');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');
const prisma = new PrismaClient();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
require('dotenv').config();

const startApolloServer = async () => {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: {ssl: true, port: 9090, hostname: 'moviese.at'},
    development: {ssl: false, port: 9090, hostname: 'localhost'},
  };

  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];

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
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  };

  const app = express();
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
  server.applyMiddleware({app, cors: corsOptions});

  app.use(express.urlencoded({
    extended: true,
  }));

  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
        {
          key: fs.readFileSync(`/etc/letsencrypt/live/moviese.at/privkey.pem`),
          cert: fs.readFileSync(`/etc/letsencrypt/live/moviese.at/fullchain.pem`),
        },
        app,
    );
  } else {
    httpServer = http.createServer(app);
  }


  await new Promise((resolve) => httpServer.listen({port: 9090}, resolve));
  console.log(
      '🚀 Server ready at',
      `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${server.graphqlPath}`,
  );
};

startApolloServer();
