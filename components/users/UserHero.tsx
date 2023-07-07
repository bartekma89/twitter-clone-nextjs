import useUser from '@/hooks/useUser';
import Image from 'next/image';
import Avatar from '../layout/Avatar';

interface ComponentProps {
  userId: string;
}

const UserHero = ({ userId }: ComponentProps) => {
  const { data: user } = useUser(userId);

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
            userId={userId}
            isLarge
            hasBorder
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
