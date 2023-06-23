const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABAS_URL,
    },
  },
});

module.exports = prisma;
