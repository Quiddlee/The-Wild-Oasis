export const CabinsFilterValues = {
  ALL: 'all',
  NO_DISCOUNT: 'no-discount',
  WITH_DISCOUNT: 'with-discount',
} as const;

export const CabinsSortValues = {
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  PRICE_ASC: 'regularPrice-asc',
  PRICE_DESC: 'regularPrice-desc',
  MAX_CAPACITY_ASC: 'maxCapacity-asc',
  MAX_CAPACITY_DESC: 'maxCapacity-desc',
} as const;

export const BookingFilterValues = {
  ALL: 'all',
  CHECKED_OUT: 'checked-out',
  CHECKED_IN: 'checked-in',
  UNCONFIRMED: 'unconfirmed',
} as const;

export const BookingSortValues = {
  START_DATE_DESK: 'startDate-desc',
  START_DATE_ASC: 'startDate-asc',
  TOTAL_PRICE_DESC: 'totalPrice-desc',
  TOTAL_PRICE_ASC: 'totalPrice-asc',
} as const;

export const StatusToTagName = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
} as const;
