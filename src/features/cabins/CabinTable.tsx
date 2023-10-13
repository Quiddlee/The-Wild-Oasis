import CabinRow from './CabinRow.tsx';
import useCabins from './useCabins.ts';
import useUrl from '../../hooks/useUrl.ts';
import { DiscountFilterValues, SortValues } from '../../types/enums.ts';
import {
  CabinType,
  DiscountFilterValueTypes,
  SortValueTypes,
} from '../../types/types.ts';
import Empty from '../../ui/Empty.tsx';
import Menus from '../../ui/Menus.tsx';
import Spinner from '../../ui/Spinner.tsx';
import Table from '../../ui/Table.tsx';
import { QUERY_DISCOUNT, QUERY_SORT } from '../../utils/const.ts';

function CabinTable() {
  const { cabins = [], isLoading } = useCabins();
  const { readUrl } = useUrl();

  const noCabins = !cabins?.length;

  if (isLoading) return <Spinner />;
  if (noCabins) return <Empty resourceName="Cabins" />;

  // 1) Filter
  const filterValue =
    readUrl<DiscountFilterValueTypes>(QUERY_DISCOUNT) ??
    DiscountFilterValues.ALL;
  let filteredCabins = cabins as CabinType[];

  if (filterValue === 'no-discount')
    filteredCabins = filteredCabins.filter(({ discount }) => discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = filteredCabins.filter(({ discount }) => discount > 0);

  // 2) Sort
  const sortBy = readUrl<SortValueTypes>(QUERY_SORT) ?? SortValues.NAME_ASC;
  const [fieldName, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) =>
      ((a[fieldName as keyof CabinType] as number) -
        (b[fieldName as keyof CabinType] as number)) *
      modifier,
  );

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

        <Table.Body<CabinType>
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
