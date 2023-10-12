import { SyntheticEvent, useCallback } from 'react';

import Select from './Select.tsx';
import useUrl from '../hooks/useUrl.ts';
import { IOptions } from '../types/interfaces.ts';
import { SortValueTypes } from '../types/types.ts';
import { QUERY_SORT } from '../utils/const.ts';

interface ISortByProps<TOptionValues extends string>
  extends IOptions<TOptionValues> {}

function SortBy<TOptionValues extends string>({
  options,
}: ISortByProps<TOptionValues>) {
  const { setUrl, readUrl } = useUrl();
  const selectedValue = readUrl<SortValueTypes>(QUERY_SORT) ?? '';

  const handleChange = useCallback(
    (e: SyntheticEvent) => {
      setUrl(QUERY_SORT, (e.target as HTMLSelectElement).value);
    },
    [setUrl],
  );

  return (
    <Select
      options={options}
      type="white"
      value={selectedValue}
      onChange={handleChange}
    />
  );
}

export default SortBy;
