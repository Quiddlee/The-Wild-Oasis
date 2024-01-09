import styled from 'styled-components';

import useRecentBookings from './useRecentBookings.ts';
import useRecentStays from './useRecentStays.ts';
import Spinner from '../../ui/Spinner.tsx';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1 /* , stays */ } = useRecentStays();
  const { isLoading: isLoading2 /* , bookings */ } = useRecentBookings();

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>List of activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
