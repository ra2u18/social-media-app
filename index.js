// Import dotenv configurations
require('dotenv').config({ path: './config.env' });

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

// Relative Imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index.resolver');

// Create GraphQL srv
// Forward the request into the context
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log(`DB connected to host -- ${res.connections[0].host}`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
