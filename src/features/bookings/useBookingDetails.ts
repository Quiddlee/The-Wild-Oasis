import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBooking } from '../../services/apiBookings.ts';
import { IBookingData } from '../../types/interfaces.ts';
import { CACHE_BOOKINGS } from '../../utils/const.ts';

function useBookingDetails() {
  const { bookingId } = useParams();

  if (bookingId === undefined) throw new Error('Cannot get booking id!');

  const { data: booking, isLoading } = useQuery({
    queryKey: [CACHE_BOOKINGS, bookingId],
    queryFn: () => getBooking(Number(bookingId)),

    // if we can't find booking that means that the data probably does not exist.
    // So no point in retrying
    retry: false,
  });

  return { booking, isLoading } as unknown as {
    booking: IBookingData;
    isLoading: boolean;
  };
}

export default useBookingDetails;
