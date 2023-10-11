import CabinRow from './CabinRow.tsx';
import useCabins from './useCabins.ts';
import { Cabin } from '../../types/types.ts';
import Menus from '../../ui/Menus.tsx';
import Spinner from '../../ui/Spinner.tsx';
import Table from '../../ui/Table.tsx';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div />
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div />
        </Table.Header>

        <Table.Body
          data={cabins as Cabin[]}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
