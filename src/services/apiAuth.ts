import supabase from './supabase.ts';

interface ILoginParams {
  email: string;
  password: string;
}

async function login({ email, password }: ILoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export default login;
