import { useQuery } from '@tanstack/react-query';

import { getSettings } from '../../services/apiSettings.ts';
import { Settings } from '../../types/types.ts';

function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { isLoading, error, settings } as {
    isLoading: boolean;
    error: unknown;
    settings: Settings | undefined;
  };
}

export default useSettings;
