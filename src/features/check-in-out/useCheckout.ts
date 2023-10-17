import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings.ts';
import { BookingStatus } from '../../types/enums.ts';
import { Booking } from '../../types/types.ts';

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutationFn: (bookingId: Booking['id']) =>
      updateBooking(bookingId, {
        status: BookingStatus.CHECKED_OUT,
      }),

    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      // invalidates all the queries currently active on the page
      void queryClient.invalidateQueries({ stale: true });
    },

    onError: () => {
      toast.error('There was an error while checking out');
    },
  });

  return { checkout, isCheckingout };
}

export default useCheckout;
