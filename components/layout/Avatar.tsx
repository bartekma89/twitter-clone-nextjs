import { useCallback, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Routes } from '@/typings/routes';
import useUser from '@/hooks/useUser';

interface ComponentProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: ComponentProps) => {
  const { data: user } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      router.push(`${Routes.USERS}/${userId}`);
    },
    [router, userId],
  );

  return (
    <div
      className={`${hasBorder ? 'border-4 border-black' : ''} ${
        isLarge ? 'h-32 w-32' : 'h-12 w-12'
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        alt='Avatar'
        onClick={onClick}
        src={user?.profileImage ?? '/images/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
