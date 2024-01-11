import { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import useCheckin from './useCheckin.ts';
import useMoveBack from '../../hooks/useMoveBack.ts';
import Button from '../../ui/Button.tsx';
import ButtonGroup from '../../ui/ButtonGroup.tsx';
import ButtonText from '../../ui/ButtonText.tsx';
import Checkbox from '../../ui/Checkbox.tsx';
import Heading from '../../ui/Heading.tsx';
import Row from '../../ui/Row.tsx';
import Spinner from '../../ui/Spinner.tsx';
import { formatCurrency } from '../../utils/helpers.ts';
import BookingDataBox from '../bookings/BookingDataBox.tsx';
import useBookingDetails from '../bookings/useBookingDetails.ts';
import useSettings from '../settings/useSettings.ts';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmPaid, setIsConfirmPaid] = useState(false);
  const [isAddBreakfast, setIsAddBreakfast] = useState(false);

  const { booking, isLoading: isLoadingBookings } = useBookingDetails();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking ?? {};
  const isLoading = isLoadingSettings || isLoadingBookings;
  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 1) * numNights * numGuests;
  let breakfastPrice = '';

  const handleCheckin = useCallback(() => {
    if (!isConfirmPaid) return;

    if (isAddBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }, [
    bookingId,
    checkIn,
    isAddBreakfast,
    isConfirmPaid,
    optionalBreakfastPrice,
    totalPrice,
  ]);

  useEffect(() => {
    setIsConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading) return <Spinner />;

  if (!isAddBreakfast) {
    breakfastPrice = formatCurrency(totalPrice);
  }

  if (isAddBreakfast) {
    const totalPriceWithBreakfast = formatCurrency(
      totalPrice + optionalBreakfastPrice,
    );

    const calcProcess = `${formatCurrency(totalPrice)} + ${formatCurrency(
      optionalBreakfastPrice,
    )}`;

    breakfastPrice = `${totalPriceWithBreakfast} (${calcProcess})`;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breafast"
            checked={isAddBreakfast}
            onChange={() => {
              setIsAddBreakfast((prevState) => !prevState);
              setIsConfirmPaid(false);
            }}>
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="check-in"
          checked={isConfirmPaid}
          onChange={() => setIsConfirmPaid((prevState) => !prevState)}
          disabled={isConfirmPaid || isCheckingIn}>
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {breakfastPrice}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!isConfirmPaid || isCheckingIn}
          onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
