import { NextApiHandler } from 'next';
import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import prisma from '@/libs/prismadb';

interface BodyProps {
  email: string;
  name: string;
  username: string;
  password: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }

  try {
    const { email, name, password, username } = req.body as BodyProps;

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        username,
        hashedPassword,
      },
    });

    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export default handler;
