import { useContext } from 'react';

import { DarkModeContext, DarkModeContextType } from './DarkModeContext.tsx';

function useDarkMode(): DarkModeContextType | never {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('useDarkMode must be used within a DarkModeProvider');

  return context;
}

export default useDarkMode;
