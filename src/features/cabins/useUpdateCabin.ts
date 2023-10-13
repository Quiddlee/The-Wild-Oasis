import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin, NewCabin } from '../../services/apiCabins.ts';
import { CabinType } from '../../types/types.ts';

interface IUpdateMutationFn {
  newCabinData: NewCabin;
  id: CabinType['id'];
}

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: IUpdateMutationFn) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!');
      void queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  return { editCabin, isEditing };
}

export default useUpdateCabin;
