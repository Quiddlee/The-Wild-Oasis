import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/apiAuth.ts';
import { CACHE_USER } from '../../utils/const.ts';

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: [CACHE_USER],
  });

  if (!user) throw new Error('The user does not exist!');

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}

export default useUser;
