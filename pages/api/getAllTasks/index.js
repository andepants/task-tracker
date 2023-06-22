import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {

  const tasks = await prisma.task.findMany()
  res.json(tasks);
}