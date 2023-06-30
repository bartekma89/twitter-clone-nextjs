import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import serverAuth from '@/libs/serverAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    return res.status(StatusCodes.OK).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export default handler;
