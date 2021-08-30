const {PrismaClient} = require('@prisma/client');
const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');
const prisma = new PrismaClient();

const port = process.env.PORT || 9090;

const server = new ApolloServer({resolvers, typeDefs,
  context: (req) => ({
    prisma,
    req,
  })});

server.listen({port}, () => console.log(
    `Server runs at: http://localhost:${port}`));
