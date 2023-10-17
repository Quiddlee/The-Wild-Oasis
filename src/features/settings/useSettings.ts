import { useQuery } from '@tanstack/react-query';

import { getSettings } from '../../services/apiSettings.ts';
import { Settings } from '../../types/types.ts';
import { CACHE_SETTINGS } from '../../utils/const.ts';

function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: [CACHE_SETTINGS],
    queryFn: getSettings,
  });

  return { isLoading, error, settings } as {
    isLoading: boolean;
    error: unknown;
    settings: Settings | undefined;
  };
}

export default useSettings;
