import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings.ts';

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully edited!');
      void queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
}

export default useUpdateSetting;
