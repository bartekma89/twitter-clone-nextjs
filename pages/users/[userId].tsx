import { useEffect, useState } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ClipLoader } from 'react-spinners';
import { Router } from 'next/router';

import prisma from '@/libs/prismadb';
import { Header, UserHero, UserBio } from '@/components';
import { User } from '@/typings/general';

const UserView = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const start = () => {
  //     setIsLoading(true);
  //   };
  //   const end = () => {
  //     setIsLoading(false);
  //   };

  //   Router.events.on('routeChangeStart', start);
  //   Router.events.on('routeChangeComplete', end);
  //   Router.events.on('routeChangeError', end);

  //   return () => {
  //     Router.events.off('routeChangeStart', start);
  //     Router.events.off('routeChangeComplete', end);
  //     Router.events.off('routeChangeError', end);
  //   };
  // }, []);

  // return (
  //   <>
  //     {isLoading ? (
  //       <div className='flex justify-center items-center h-full'>
  //         <ClipLoader
  //           color='lightBlue'
  //           size={80}
  //         />
  //       </div>
  //     ) : (
  //       <>
  //         <Header
  //           showBackArrow
  //           label={user.name ?? ''}
  //         />
  //         <UserHero user={user} />
  //         <UserBio user={user} />
  //       </>
  //     )}
  //   </>
  // );

  return (
    <>
      <Header
        showBackArrow
        label={user.name ?? ''}
      />
      <UserHero user={user} />
      <UserBio user={user} />
    </>
  );
};

export default UserView;

export const getServerSideProps: GetServerSideProps<{ user: User }, { userId: string }> = async ({ params }) => {
  if (!params?.userId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: params.userId,
      },
    },
  });

  if (!existingUser) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        ...existingUser,
        createdAt: JSON.stringify(existingUser.createdAt),
        updatedAt: JSON.stringify(existingUser.updatedAt),
        followersCount,
      },
    },
  };
};
