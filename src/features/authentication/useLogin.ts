/* eslint-disable no-console */
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import login from '../../services/apiAuth.ts';

interface IMutationFnParams {
  email: string;
  password: string;
}

function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: loginUser,
    isLoading: isLogging,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: IMutationFnParams) =>
      login({ email, password }),
    onSuccess: () => {
      toast.success('Successfully logged in');
      navigate('/');
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { loginUser, isLogging, error };
}

export default useLogin;
