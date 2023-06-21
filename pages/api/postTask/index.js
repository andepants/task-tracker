import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  console.log(req.body, 'req.body');
  console.log(req.method, 'req.method');

  const post = await prisma.task.create({
    data: {
      title: 'Title of description 1',
      description: 'alice@prisma.io',
      dueDate: new Date(),
      status: 'Pending',
    },
  })


  const users = await prisma.user.findMany()
  console.log('post', post)
  res.json(post);
}