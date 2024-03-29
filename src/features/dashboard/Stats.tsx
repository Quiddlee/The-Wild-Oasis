import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import Stat from './Stat.tsx';
import { Booking } from '../../types/types.ts';
import { formatCurrency } from '../../utils/helpers.ts';

interface IStats {
  bookings: Booking[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: IStats) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  // 3.
  const totalCheckIns = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, booking) => acc + booking.numNights, 0) /
    (numDays * cabinCount);
  const occupancyRate = `${Math.round(occupation * 100)}%`;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
