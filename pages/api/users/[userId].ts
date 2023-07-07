import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import prisma from '@/libs/prismadb';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }

  try {
    const { userId } = req.query as { userId: string };

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid userId');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(StatusCodes.OK).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export default handler;
