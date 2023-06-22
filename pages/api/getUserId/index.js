import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username : req.body.user,
    },
  })
  res.json(user);
}