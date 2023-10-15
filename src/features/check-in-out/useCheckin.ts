import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { updateBooking } from '../../services/apiBookings.ts';
import { BookingStatus } from '../../types/enums.ts';
import { Booking } from '../../types/types.ts';

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutationFn: (bookingId: Booking['id']) =>
      updateBooking(bookingId, {
        status: BookingStatus.CHECKED_IN,
        isPaid: true,
      }),

    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      // invalidates all the queries currently active on the page
      void queryClient.invalidateQueries({ stale: true });
      navigate('/');
    },

    onError: () => {
      toast.error('There was an error while checking in');
    },
  });

  return { checkIn, isCheckingIn };
}

export default useCheckin;
