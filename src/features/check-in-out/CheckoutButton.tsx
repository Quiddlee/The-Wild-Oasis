import Button from '../../ui/Button';
import { Booking } from '../../types';

interface ICheckoutButtonProps {
  bookingId: Pick<Booking, 'id'>;
}

function CheckoutButton({ bookingId }: ICheckoutButtonProps) {
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
