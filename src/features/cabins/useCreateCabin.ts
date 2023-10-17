import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins.ts';
import { CACHE_CABINS } from '../../utils/const.ts';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      void queryClient.invalidateQueries({ queryKey: [CACHE_CABINS] });
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
