import BookingTable from '../features/bookings/BookingTable.tsx';
import BookingTableOperations from '../features/bookings/BookingTableOperations.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
