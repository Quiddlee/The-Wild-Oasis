import supabase from './supabase.ts';

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export default getCabins;
