import { format, isToday } from 'date-fns';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useDeleteBooking from './useDeleteBooking.ts';
import { BookingStatus, StatusToTagName } from '../../types/enums.ts';
import { IBookingData } from '../../types/interfaces.ts';
import ConfirmDelete from '../../ui/ConfirmDelete.tsx';
import Menus from '../../ui/Menus.tsx';
import Modal from '../../ui/Modal.tsx';
import Table from '../../ui/Table.tsx';
import Tag from '../../ui/Tag.tsx';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers.ts';
import useCheckout from '../check-in-out/useCheckout.ts';

interface IBookingRowProps {
  booking: IBookingData;
}

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono', sans-serif;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono', sans-serif;
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: IBookingRowProps) {
  const navigate = useNavigate();
  const { checkout, isCheckingout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>
      <Tag type={StatusToTagName[status]}>{status.replace('-', ' ')}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}>
              See details
            </Menus.Button>

            {status === BookingStatus.UNCONFIRMED && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Menus.Button>
            )}

            {status === BookingStatus.CHECKED_IN && (
              <Menus.Button
                disabled={isCheckingout}
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  checkout(bookingId);
                }}>
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
