import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

import useUrl from '../../hooks/useUrl.ts';
import { getBookingsAfterDate } from '../../services/apiBookings.ts';
import { CACHE_STAYS } from '../../utils/const.ts';

function useRecentBookings() {
  const { readUrl } = useUrl();

  const last = readUrl('last');
  const numDays = !last ? 7 : Number(last);
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: [CACHE_STAYS, `last-${numDays}`],
  });

  return { isLoading, bookings };
}

export default useRecentBookings;
