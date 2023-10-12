import { useSearchParams } from 'react-router-dom';

import CabinRow from './CabinRow.tsx';
import useCabins from './useCabins.ts';
import DiscountFilterValues from '../../types/enums.ts';
import { Cabin, DiscountFilterValueTypes } from '../../types/types.ts';
import Menus from '../../ui/Menus.tsx';
import Spinner from '../../ui/Spinner.tsx';
import Table from '../../ui/Table.tsx';
import QUERY_DISCOUNT from '../../utils/const.ts';

function CabinTable() {
  const { cabins = [], isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue =
    (searchParams.get(QUERY_DISCOUNT) as DiscountFilterValueTypes) ??
    DiscountFilterValues.ALL;
  let filteredCabins = cabins as Cabin[];

  if (filterValue === 'no-discount')
    filteredCabins = filteredCabins.filter(({ discount }) => discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = filteredCabins.filter(({ discount }) => discount > 0);

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
          data={filteredCabins}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
