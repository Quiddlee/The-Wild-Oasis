import DashboardFilter from '../features/dashboard/DashboardFilter.tsx';
import DashboardLayout from '../features/dashboard/DashboardLayout.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
