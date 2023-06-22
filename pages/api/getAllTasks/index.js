import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  console.log(req.body, 'req.body');
  console.log(req.method, 'req.method');

  const tasks = await prisma.task.findMany()
  // console.log('tasks', tasks)
  res.json(tasks);
}