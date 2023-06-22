import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  console.log('req.body', req.body)
  const post = await prisma.task.create({
    data: req.body,
  })
  res.json(post);
}