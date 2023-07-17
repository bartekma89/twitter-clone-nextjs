import { useCallback, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Routes } from '@/typings/routes';
import { User } from '@/typings/general';

interface ComponentProps {
  user: User;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ user, isLarge, hasBorder }: ComponentProps) => {
  const router = useRouter();

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      router.push(`${Routes.USERS}/${user?.id}`);
    },
    [router, user?.id],
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
