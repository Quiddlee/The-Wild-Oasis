import { useCallback } from 'react';

import useMoveBack from '../../hooks/useMoveBack.ts';
import { Booking } from '../../types/types.ts';
import Button from '../../ui/Button.tsx';
import ButtonGroup from '../../ui/ButtonGroup.tsx';
import ButtonText from '../../ui/ButtonText.tsx';
import Heading from '../../ui/Heading.tsx';
import Row from '../../ui/Row.tsx';
import BookingDataBox from '../bookings/BookingDataBox.tsx';

// const Box = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
// `;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const booking = {} as Booking;

  const {
    id: bookingId,
    /*
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
       */
  } = booking;

  const handleCheckin = useCallback(() => {}, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
