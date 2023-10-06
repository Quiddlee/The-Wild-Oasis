import CabinTable from '../features/cabins/CabinTable.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
