import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  console.log(req.body, 'req.body');
  console.log(req.method, 'req.method');
  console.log('inside the createNewUser api')

  const newUser = await prisma.user.create({
    data: { username: req.body.user },
  })


  // const users = await prisma.user.findMany()
  console.log('newUser', newUser)
  res.json(newUser);
}