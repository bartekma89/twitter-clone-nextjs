import Image from 'next/image';

import Avatar from '../layout/Avatar';
import { User } from '@/typings/general';

interface ComponentProps {
  user: User;
}

const UserHero = ({ user }: ComponentProps) => {
  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt='Cover Image'
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar
            user={user}
            isLarge
            hasBorder
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
