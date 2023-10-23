import { ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Spinner from './Spinner.tsx';
import useUser from '../features/authentication/useUser.ts';

interface IProtectedRouteProps {
  children: ReactNode;
}

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: IProtectedRouteProps) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
