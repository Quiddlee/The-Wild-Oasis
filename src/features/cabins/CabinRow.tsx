import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import CreateCabinForm from './CreateCabinForm.tsx';
import useCreateCabin from './useCreateCabin.ts';
import useDeleteCabin from './useDeleteCabin.ts';
import type { Cabin } from '../../types/types.ts';
import ConfirmDelete from '../../ui/ConfirmDelete.tsx';
import Modal from '../../ui/Modal.tsx';
import Table from '../../ui/Table.tsx';
import { formatCurrency } from '../../utils/helpers.ts';

interface ICabinRow {
  cabin: Cabin;
}

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
    <Table.Row>
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

        <Modal>
          <Modal.Open opens="edit">
            <button type="button">
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button disabled={isDeleting} type="button">
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
