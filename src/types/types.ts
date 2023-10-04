export type Guest = Readonly<{
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalID: string;
}>;

export type Cabins = Readonly<{
  name: string;
}>;

export type Booking = Readonly<{
  id: string;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: boolean;
  isPaid: boolean;
  status: string;
  guests: Guest;
  cabins: Cabins;
}>;

export type ExtractValues<TObj extends object> = TObj[keyof TObj];
