import { createContext, PropsWithChildren, useCallback, useMemo } from 'react';

import useLocalStorageState from '../hooks/useLocalStorageState.ts';

export interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>(
  {} as DarkModeContextType,
);

function DarkModeProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    false,
    'isDarkMode',
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((isDark) => !isDark);
  }, [setIsDarkMode]);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode, toggleDarkMode],
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
