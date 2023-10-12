import DiscountFilterValues from './enums.ts';

export type Guest = Readonly<{
  id: number;
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalID: string;
  nationality: string;
}>;

export type Cabin = Readonly<{
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}>;

export type Booking = Readonly<{
  id: number;
  createdAt: Date;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  observations: boolean;
  cabinId: number;
  guestId: number;
  isPaid: boolean;
  guests: Guest;
  cabins: Cabin;
}>;

export type Settings = Readonly<{
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}>;

export type ExtractValues<TObj extends object> = TObj[keyof TObj];

export type CreateCabinFormData = Omit<Cabin, 'image' | 'id'> &
  Readonly<{
    image: FileList | string;
  }>;

export type DiscountFilterValueTypes =
  (typeof DiscountFilterValues)[keyof typeof DiscountFilterValues];
