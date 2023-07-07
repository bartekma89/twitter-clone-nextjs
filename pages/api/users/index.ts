import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import prisma from '@/libs/prismadb';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export default handler;
