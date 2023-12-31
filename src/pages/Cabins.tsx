import AddCabin from '../features/cabins/AddCabin.tsx';
import CabinTable from '../features/cabins/CabinTable.tsx';
import CabinTableOperations from '../features/cabins/CabinTableOperations.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
