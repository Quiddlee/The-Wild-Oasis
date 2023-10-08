import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin, NewCabin } from '../../services/apiCabins.ts';
import { Cabin } from '../../types/types.ts';

interface IUpdateMutationFn {
  newCabinData: NewCabin;
  id: Cabin['id'];
}

function useEditCabin() {
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

export default useEditCabin;
