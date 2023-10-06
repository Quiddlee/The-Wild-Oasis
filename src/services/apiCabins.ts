import supabase from './supabase.ts';
import { Cabin } from '../types/types.ts';

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data as unknown as Cabin[];
}

export default getCabins;
