import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.user,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Set the Access-Control-Allow-Origin header to allow all origins
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
