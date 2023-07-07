import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import isNil from 'lodash/isNil';

import { Header, UserHero, UserBio } from '@/components';
import useUser from '@/hooks/useUser';

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };

  const { data: user, isLoading } = useUser(userId);

  if (isLoading || isNil(user)) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader
          color='lightBlue'
          size={80}
        />
      </div>
    );
  }

  return (
    <>
      <Header
        showBackArrow
        label={user?.name ?? ''}
      />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
    </>
  );
};

export default UserView;
