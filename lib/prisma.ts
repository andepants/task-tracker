const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.POSTGRES_PRISMA_URL,
      directUrl: process.env.POSTGRES_URL_NON_POOLING,
      shadowDatabaseUrl: process.env.POSTGRES_URL_NON_POOLING,
    },
  },
});

module.exports = prisma;
