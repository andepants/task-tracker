import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  console.log('req.body', req.body)

  const post = await prisma.task.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
    },
  })

  res.json(post);
}