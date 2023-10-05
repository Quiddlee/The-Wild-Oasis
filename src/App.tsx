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

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
