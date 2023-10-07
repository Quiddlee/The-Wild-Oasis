/* eslint-disable no-console */

import supabase from './supabase.ts';
import { Cabin, CreateCabinFormData } from '../types/types.ts';

export type NewCabin = Omit<CreateCabinFormData, 'image'> & {
  readonly image: string | File;
};

const isImageExist = (image: File | string): image is string =>
  typeof image === 'string';

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin: NewCabin, id?: Cabin['id']) {
  const hasImagePath = isImageExist(newCabin.image);

  // Getting sure that the image has unique name with random num.
  // Also replacing '/' for supabase to not incidental create a folder instead of image e.g. cabin-001/2.jpg -> cabin-0012.jpg
  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  // Will look like this - https://lkpuukpquesenlbgflwk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Crete/edit the cabin
  let query = supabase.from('cabins');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error || !newCabin?.image) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading an image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

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
