import { PostgrestError } from '@supabase/supabase-js';

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;

export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;

export type DbResultErr = PostgrestError;

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabinPrice: number | null;
          cabinId: number | null;
          created_at: string;
          endDate: string | null;
          extrasPrice: number | null;
          guestId: number | null;
          hasBreakfast: boolean | null;
          id: number;
          isPaid: boolean | null;
          numGuests: number | null;
          numNights: number | null;
          observations: string | null;
          startDate: string | null;
          status: string | null;
          totalPrice: number | null;
        };
        Insert: {
          cabinPrice?: number | null;
          cabinId?: number | null;
          created_at?: string;
          endDate?: string | null;
          extrasPrice?: number | null;
          guestId?: number | null;
          hasBreakfast?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numGuests?: number | null;
          numNights?: number | null;
          observations?: string | null;
          startDate?: string | null;
          status?: string | null;
          totalPrice?: number | null;
        };
        Update: {
          cabinPrice?: number | null;
          cabinId?: number | null;
          created_at?: string;
          endDate?: string | null;
          extrasPrice?: number | null;
          guestId?: number | null;
          hasBreakfast?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numGuests?: number | null;
          numNights?: number | null;
          observations?: string | null;
          startDate?: string | null;
          status?: string | null;
          totalPrice?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_cabinId_fkey';
            columns: ['cabinId'];
            referencedRelation: 'cabins';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_guestId_fkey';
            columns: ['guestId'];
            referencedRelation: 'guests';
            referencedColumns: ['id'];
          },
        ];
      };
      cabins: {
        Row: {
          created_at: string;
          description: string | null;
          discount: number | null;
          id: number;
          image: string | null;
          maxCapacity: number | null;
          name: string | null;
          regularPrice: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: number;
          image?: string | null;
          maxCapacity?: number | null;
          name?: string | null;
          regularPrice?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: number;
          image?: string | null;
          maxCapacity?: number | null;
          name?: string | null;
          regularPrice?: number | null;
        };
        Relationships: [];
      };
      guests: {
        Row: {
          countryFlag: string | null;
          created_at: string;
          email: string | null;
          fullName: string | null;
          id: number;
          nationalID: string | null;
          nationality: string | null;
        };
        Insert: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: number;
          nationalID?: string | null;
          nationality?: string | null;
        };
        Update: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: number;
          nationalID?: string | null;
          nationality?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          breakfastPrice: number;
          created_at: string;
          id: number;
          maxBookingLength: number;
          maxGuestsPerBooking: number;
          minBookingLength: number;
        };
        Insert: {
          breakfastPrice?: number | null;
          created_at?: string;
          id?: number;
          maxBookingLength?: number | null;
          maxGuestsPerBooking?: number | null;
          minBookingLength?: number | null;
        };
        Update: {
          breakfastPrice?: number | null;
          created_at?: string;
          id?: number;
          maxBookingLength?: number | null;
          maxGuestsPerBooking?: number | null;
          minBookingLength?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
