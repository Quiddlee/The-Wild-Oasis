import useCheckout from './useCheckout.ts';
import { Booking } from '../../types/types.ts';
import Button from '../../ui/Button.tsx';

interface ICheckoutButtonProps {
  bookingId: Booking['id'];
}

function CheckoutButton({ bookingId }: ICheckoutButtonProps) {
  const { checkout, isCheckingout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
