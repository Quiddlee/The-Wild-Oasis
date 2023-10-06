import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { deleteCabin } from '../../services/apiCabins.ts';
import type { Cabin } from '../../types/types.ts';
import { formatCurrency } from '../../utils/helpers.ts';

interface ICabinRow {
  cabin: Cabin;
}

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabins = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono', sans-serif;
`;

const Price = styled.div`
  font-family: 'Sono', sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono', sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: ICabinRow) {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      }),

    onError: (error) => {
      if (error && typeof error === 'object' && 'message' in error)
        // eslint-disable-next-line no-console
        console.error(error.message);
    },
  });

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <TableRow>
      <Img src={image} />
      <Cabins>{name}</Cabins>
      <div>Fits it up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button
        disabled={isDeleting}
        onClick={() => mutate(cabinId)}
        type="button">
        Delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
