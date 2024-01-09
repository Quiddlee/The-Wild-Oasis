import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import ButtonIcon from './ButtonIcon.tsx';
import useDarkMode from '../context/useDarkMode.tsx';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
