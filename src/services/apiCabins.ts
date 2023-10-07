/* eslint-disable no-console */

import supabase from './supabase.ts';
import { CreateCabinFormData } from '../types/types.ts';

type NewCabin = Omit<CreateCabinFormData, 'image'> & { readonly image: File };

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin: NewCabin) {
  // Getting sure that the image has unique name with random num.
  // Also replacing '/' for supabase to not incidental create a folder instead of image e.g. cabin-001/2.jpg -> cabin-0012.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  // Will look like this - https://lkpuukpquesenlbgflwk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Crete the cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error || !newCabin?.image || !data?.at(0)) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading an image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.at(0)!.id);

    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded. Cabin could not be created',
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

export default getCabins;
