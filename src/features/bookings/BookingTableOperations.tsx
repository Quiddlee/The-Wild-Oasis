import {
  BookingsFilterValueTypes,
  BookingsSortValueTypes,
} from '../../types/types.ts';
import Filter from '../../ui/Filter.tsx';
import SortBy from '../../ui/SortBy.tsx';
import TableOperations from '../../ui/TableOperations.tsx';
import { QUERY_STATUS } from '../../utils/const.ts';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter<BookingsFilterValueTypes>
        filterField={QUERY_STATUS}
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy<BookingsSortValueTypes>
        options={[
          { value: 'startDate-desc', label: 'Sort by date (recent first)' },
          { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'totalPrice-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
