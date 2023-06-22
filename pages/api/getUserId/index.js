import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

export default async function handle(req, res) {
  console.log(req.body, 'req.body');
  console.log('inside the getUserId api')
  console.log(typeof req.body.user, 'req.body.user')
  console.log(req.body.user, 'req.body.user')

  const user = await prisma.user.findUnique({
    where: {
      username : req.body.user,
    },
  })

  console.log('user', user)
  res.json(user);
}