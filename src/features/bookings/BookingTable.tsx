import BookingRow from './BookingRow.tsx';
import useBookings from './useBookings.ts';
import { IBookingRowData } from '../../types/interfaces.ts';
import Empty from '../../ui/Empty.tsx';
import Menus from '../../ui/Menus.tsx';
import Pagination from '../../ui/Pagination.tsx';
import Spinner from '../../ui/Spinner.tsx';
import Table from '../../ui/Table.tsx';

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();

  const noBookings = !bookings?.length;

  if (isLoading) return <Spinner />;
  if (noBookings) return <Empty resourceName="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div />
        </Table.Header>

        <Table.Body<IBookingRowData>
          data={bookings as unknown as IBookingRowData[]}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count ?? 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
