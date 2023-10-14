import BookingRow from './BookingRow.tsx';
import { IBookingRowData } from '../../types/interfaces.ts';
import Empty from '../../ui/Empty.tsx';
import Menus from '../../ui/Menus.tsx';
import Pagination from '../../ui/Pagination.tsx';
import Table from '../../ui/Table.tsx';

interface IBookingTableProps {
  bookings: IBookingRowData[];
}

function BookingTable({ bookings }: IBookingTableProps) {
  const noBookings = !bookings?.length;

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
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={15} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
