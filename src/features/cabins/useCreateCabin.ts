import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins.ts';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      void queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
