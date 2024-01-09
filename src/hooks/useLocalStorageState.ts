import { useEffect, useState } from 'react';

import { LocalStorageKeys } from '../types/enums.ts';

function useLocalStorageState<TValue>(
  initialState: NonNullable<unknown>,
  key: keyof typeof LocalStorageKeys,
) {
  const [value, setValue] = useState<TValue>(() => {
    const storedValue = localStorage.getItem(LocalStorageKeys[key]);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(LocalStorageKeys[key], JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [TValue, typeof setValue];
}

export default useLocalStorageState;
