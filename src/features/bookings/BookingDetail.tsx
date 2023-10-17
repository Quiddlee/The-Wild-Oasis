import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BookingDataBox from './BookingDataBox.tsx';
import useBookingDetails from './useBookingDetails.ts';
import useMoveBack from '../../hooks/useMoveBack.ts';
import { BookingStatus, StatusToTagName } from '../../types/enums.ts';
import Button from '../../ui/Button.tsx';
import ButtonGroup from '../../ui/ButtonGroup.tsx';
import ButtonText from '../../ui/ButtonText.tsx';
import Heading from '../../ui/Heading.tsx';
import Row from '../../ui/Row.tsx';
import Spinner from '../../ui/Spinner.tsx';
import Tag from '../../ui/Tag.tsx';
import useCheckout from '../check-in-out/useCheckout.ts';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBookingDetails();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingout } = useCheckout();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={StatusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === BookingStatus.CHECKED_IN && (
          <Button
            disabled={isCheckingout}
            onClick={() => {
              checkout(bookingId);
            }}>
            Check out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
