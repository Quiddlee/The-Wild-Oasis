export const DiscountFilterValues = {
  ALL: 'all',
  NO_DISCOUNT: 'no-discount',
  WITH_DISCOUNT: 'with-discount',
} as const;

export const SortValues = {
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  PRICE_ASC: 'regularPrice-asc',
  PRICE_DESC: 'regularPrice-desc',
  MAX_CAPACITY_ASC: 'maxCapacity-asc',
  MAX_CAPACITY_DESC: 'maxCapacity-desc',
} as const;
