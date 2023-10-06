import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Account from './pages/Account.tsx';
import Bookings from './pages/Bookings.tsx';
import Cabins from './pages/Cabins.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Settings from './pages/Settings.tsx';
import Users from './pages/Users.tsx';
import GlobalStyles from './styles/GlobalStyles.tsx';
import AppLayout from './ui/AppLayout.tsx';

// const oneMinute = 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: oneMinute,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />

      <GlobalStyles />
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
