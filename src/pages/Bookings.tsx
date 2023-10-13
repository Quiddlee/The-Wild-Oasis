import BookingTable from '../features/bookings/BookingTable.tsx';
import BookingTableOperations from '../features/bookings/BookingTableOperations.tsx';
import useBookings from '../features/bookings/useBookings.ts';
import { IBookingRowData } from '../types/interfaces.ts';
import Empty from '../ui/Empty.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';
import Spinner from '../ui/Spinner.tsx';

function Bookings() {
  const { bookings, isLoading } = useBookings();

  const noCabins = !bookings?.length;

  if (isLoading) return <Spinner />;
  if (noCabins) return <Empty resourceName="Bookings" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable bookings={bookings as unknown as IBookingRowData[]} />
    </>
  );
}

export default Bookings;
