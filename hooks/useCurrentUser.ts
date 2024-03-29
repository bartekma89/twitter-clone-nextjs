import useSWR from 'swr';

import fetcher from '@/libs/fetcher';
import { UserProps } from '@/typings/general';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<UserProps>('/api/current', fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
