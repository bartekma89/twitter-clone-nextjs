import useSWR from 'swr';

import fetcher from '@/libs/fetcher';
import { UserProps } from '@/typings/general';

interface UserDataProps extends UserProps {
  followersCount: number;
}

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<UserDataProps>(userId ? `/api/users/${userId}` : null, fetcher);

  return { data, error, isLoading, mutate };
};

export default useUser;
