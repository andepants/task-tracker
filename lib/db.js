const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.POSTGRES_URL,
    },
  },
});

module.exports = prisma;
