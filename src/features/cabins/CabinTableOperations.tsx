import { CabinsFilterValues } from '../../types/enums.ts';
import {
  CabinsFilterValueTypes,
  CabinsSortValueTypes,
} from '../../types/types.ts';
import Filter from '../../ui/Filter.tsx';
import SortBy from '../../ui/SortBy.tsx';
import TableOperations from '../../ui/TableOperations.tsx';
import { QUERY_DISCOUNT } from '../../utils/const.ts';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter<CabinsFilterValueTypes>
        filterField={QUERY_DISCOUNT}
        options={[
          {
            label: 'all',
            value: CabinsFilterValues.ALL,
          },
          {
            label: 'No Discount',
            value: CabinsFilterValues.NO_DISCOUNT,
          },
          {
            label: 'With Discount',
            value: CabinsFilterValues.WITH_DISCOUNT,
          },
        ]}
      />

      <SortBy<CabinsSortValueTypes>
        options={[
          {
            label: 'Sort by name (A-Z)',
            value: 'name-asc',
          },
          {
            label: 'Sort by name (Z-A)',
            value: 'name-desc',
          },
          {
            label: 'Search by price (low first)',
            value: 'regularPrice-asc',
          },
          {
            label: 'Search by price (high first)',
            value: 'regularPrice-desc',
          },
          {
            label: 'Search by max capacity (low first)',
            value: 'maxCapacity-asc',
          },
          {
            label: 'Search by max capacity (high first)',
            value: 'maxCapacity-desc',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
