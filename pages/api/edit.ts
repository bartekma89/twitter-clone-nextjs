import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { bio, coverImage, name, profileImage, username } = req.body as {
      name: string;
      username: string;
      bio: string;
      profileImage: string;
      coverImage: string;
    };

    if (!name && !username) {
      throw new Error('Missing required fileds');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export default handler;
