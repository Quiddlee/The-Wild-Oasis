/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/apiAuth.ts';
import { CACHE_USER } from '../../utils/const.ts';

interface IMutationFnParams {
  email: string;
  password: string;
}

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loginUser,
    isLoading: isLogging,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: IMutationFnParams) =>
      login({ email, password }),
    onSuccess: (user) => {
      toast.success('Successfully logged in');
      queryClient.setQueryData([CACHE_USER], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { loginUser, isLogging, error };
}

export default useLogin;
