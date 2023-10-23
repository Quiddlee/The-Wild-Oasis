import { SyntheticEvent, useCallback, useState } from 'react';

import useLogin from './useLogin.ts';
import Button from '../../ui/Button.tsx';
import Form from '../../ui/Form.tsx';
import FormRowVertical from '../../ui/FormRowVertical.tsx';
import Input from '../../ui/Input.tsx';
import SpinnerMini from '../../ui/SpinnerMini.tsx';

function LoginForm() {
  const [email, setEmail] = useState('Bohdan@example.com');
  const [password, setPassword] = useState('password');
  const { loginUser, isLogging } = useLogin();

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      if (!email || !password) return;
      loginUser(
        { email, password },
        {
          onSettled: () => {
            setEmail('');
            setPassword('');
          },
        },
      );
    },
    [email, loginUser, password],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLogging} size="large">
          {isLogging ? <SpinnerMini /> : 'Log in'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
