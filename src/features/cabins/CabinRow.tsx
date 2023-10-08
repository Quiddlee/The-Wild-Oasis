import { useState } from 'react';

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import CreateCabinForm from './CreateCabinForm.tsx';
import useCreateCabin from './useCreateCabin.ts';
import useDeleteCabin from './useDeleteCabin.ts';
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
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { createCabin, isCreating } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabins>{name}</Cabins>
        <div>Fits it up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreating} type="button" onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)} type="button">
            <HiPencil />
          </button>
          <button
            disabled={isDeleting}
            onClick={() => deleteCabin(cabinId)}
            type="button">
            <HiTrash />
          </button>
        </div>
      </TableRow>

      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
