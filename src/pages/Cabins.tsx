import { useState } from 'react';

import CabinTable from '../features/cabins/CabinTable.tsx';
import CreateCabinForm from '../features/cabins/CreateCabinForm.tsx';
import Button from '../ui/Button.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
