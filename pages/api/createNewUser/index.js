import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  const newUser = await prisma.user.create({
    data: { username: req.body.user },
  })
  res.json(newUser);
}