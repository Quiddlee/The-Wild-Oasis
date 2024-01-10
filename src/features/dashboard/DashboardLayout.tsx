import styled from 'styled-components';

import SalesChart from './SalesChart.tsx';
import Stats from './Stats.tsx';
import useRecentBookings from './useRecentBookings.ts';
import useRecentStays from './useRecentStays.ts';
import Spinner from '../../ui/Spinner.tsx';
import useCabins from '../cabins/useCabins.ts';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoading2, bookings } = useRecentBookings();
  const { isLoading: isLoading3, cabins } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  if (!confirmedStays || !bookings || !cabins) return null;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>List of activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
