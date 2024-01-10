import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

import useUrl from '../../hooks/useUrl.ts';
import { getStaysAfterDate } from '../../services/apiBookings.ts';
import { CACHE_BOOKINGS } from '../../utils/const.ts';

function useResendBookings() {
  const { readUrl } = useUrl();

  const last = readUrl('last');
  const numDays = !last ? 7 : Number(last);
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: [CACHE_BOOKINGS, `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  return { isLoading, stays, confirmedStays, numDays };
}

export default useResendBookings;
