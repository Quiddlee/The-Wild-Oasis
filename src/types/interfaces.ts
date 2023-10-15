import { Booking, CabinType, Guests } from './types.ts';

export interface IOption<TValues extends string> {
  value: TValues;
  label: string;
}

export interface IOptions<TOptionValues extends string> {
  options: IOption<TOptionValues>[];
}

export interface IBookingData extends Booking {
  guests: Guests;
  cabins: CabinType;
}
