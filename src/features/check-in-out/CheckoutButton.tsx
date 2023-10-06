import { Booking } from '../../types/types.ts';
import Button from '../../ui/Button.tsx';

interface ICheckoutButtonProps {
  bookingId: Pick<Booking, 'id'>;
}

function CheckoutButton({ bookingId }: ICheckoutButtonProps) {
  // eslint-disable-next-line no-console
  console.log(bookingId);

  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
