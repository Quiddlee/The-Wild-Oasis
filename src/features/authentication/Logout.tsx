import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import useLogout from './useLogout.ts';
import ButtonIcon from '../../ui/ButtonIcon.tsx';
import SpinnerMini from '../../ui/SpinnerMini.tsx';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoading}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
