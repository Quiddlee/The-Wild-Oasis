import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCurrentUser } from '../../services/apiAuth.ts';
import { CACHE_USER } from '../../utils/const.ts';

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('User account successfully updated!');
      void queryClient.invalidateQueries({ queryKey: [CACHE_USER] });
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
