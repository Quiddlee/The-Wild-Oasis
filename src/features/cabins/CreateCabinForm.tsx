/* eslint-disable react/jsx-props-no-spreading */
import { isError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createEditCabin, NewCabin } from '../../services/apiCabins.ts';
import type { Cabin } from '../../types/types.ts';
import { CreateCabinFormData } from '../../types/types.ts';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';
import Textarea from '../../ui/Textarea.tsx';

interface ICreateCabinForm {
  cabinToEdit?: Cabin;
}

interface IUpdateMutationFn {
  newCabinData: NewCabin;
  id: Cabin['id'];
}

function CreateCabinForm({ cabinToEdit = {} as Cabin }: ICreateCabinForm) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } =
    useForm<CreateCabinFormData>({
      defaultValues: isEditSession
        ? (editValue as unknown as CreateCabinFormData)
        : {},
    });

  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      void queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: IUpdateMutationFn) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!');
      void queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => {
      if (isError(error)) toast.error(error.message);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data: CreateCabinFormData) {
    const isImageUpdated = typeof data.image !== 'string';

    const image = isImageUpdated ? data.image[0] : data.image;

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image });
  }

  function onError(/* err: FieldErrors */) {
    // console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value, formValues) => {
              const discountBiggerThanPrice =
                Number(value) >= Number(formValues.regularPrice);

              return discountBiggerThanPrice
                ? 'Discount should be less than regular price'
                : true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          // type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? 'Edit cabin' : 'Create new cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.defaultProps = {
  cabinToEdit: {} as Cabin,
};

export default CreateCabinForm;
