import { DiscountFilterValues } from '../../types/enums.ts';
import { DiscountFilterValueTypes, SortValueTypes } from '../../types/types.ts';
import Filter from '../../ui/Filter.tsx';
import SortBy from '../../ui/SortBy.tsx';
import TableOperations from '../../ui/TableOperations.tsx';
import { QUERY_DISCOUNT } from '../../utils/const.ts';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter<DiscountFilterValueTypes>
        filterField={QUERY_DISCOUNT}
        options={[
          {
            label: 'all',
            value: DiscountFilterValues.ALL,
          },
          {
            label: 'No Discount',
            value: DiscountFilterValues.NO_DISCOUNT,
          },
          {
            label: 'With Discount',
            value: DiscountFilterValues.WITH_DISCOUNT,
          },
        ]}
      />

      <SortBy<SortValueTypes>
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
