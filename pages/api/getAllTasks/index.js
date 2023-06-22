import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  try {
    const userId = req.body.id;
    const tasks = await prisma.task.findMany({ where: { userId: userId } });
    res.json(tasks);
  } catch (error) {
    console.error('Error occurred while retrieving tasks:', error);
    res.status(500).json({ error: 'An error occurred while retrieving tasks.' });
  }
}
