import { useQuery } from '@tanstack/react-query';

import { getStaysTodayActivity } from '../../services/apiBookings.ts';
import { CACHE_TODAY_ACTIVITY } from '../../utils/const.ts';

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: [CACHE_TODAY_ACTIVITY],
  });

  return { isLoading, activities };
}

export default useTodayActivity;
