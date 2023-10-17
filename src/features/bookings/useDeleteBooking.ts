import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingApi } from '../../services/apiBookings.ts';
import { CACHE_BOOKINGS } from '../../utils/const.ts';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: async () => {
      toast.success('Booking successfully deleted');
      void queryClient.invalidateQueries({ queryKey: [CACHE_BOOKINGS] });
    },

    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
