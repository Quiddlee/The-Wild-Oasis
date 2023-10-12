import DiscountFilterValues from '../../types/enums.ts';
import { DiscountFilterValueTypes } from '../../types/types.ts';
import Filter from '../../ui/Filter.tsx';
import TableOperations from '../../ui/TableOperations.tsx';
import QUERY_DISCOUNT from '../../utils/const.ts';

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
    </TableOperations>
  );
}

export default CabinTableOperations;
