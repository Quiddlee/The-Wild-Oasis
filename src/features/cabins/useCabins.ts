import { useQuery } from '@tanstack/react-query';

import getCabins from '../../services/apiCabins.ts';
import { CACHE_CABINS } from '../../utils/const.ts';

function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: [CACHE_CABINS],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
}

export default useCabins;
