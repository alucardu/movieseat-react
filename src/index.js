// entry point for the apollo server

const {PrismaClient} = require('@prisma/client');
const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 9090;

const getUser = (token) => {
  if (token) {
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'supersecret');
    return decoded;
  }
};

const server = new ApolloServer({resolvers, typeDefs,
  context: ({req}) => {
    prisma;
    const token = req.headers.authorization || '';
    const user = getUser(token);
    return {user};
  },
});

server.listen({port}, () => console.log(
    `Server runs at: http://localhost:${port}`));
