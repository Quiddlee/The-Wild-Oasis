import { SyntheticEvent, useCallback, useState } from 'react';

import { User } from '@supabase/supabase-js';

import useUpdateUser from './useUpdateUser.ts';
import useUser from './useUser.ts';
import Button from '../../ui/Button.tsx';
import FileInput from '../../ui/FileInput.tsx';
import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser() as { user: User };

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (!fullName) return;

      updateUser(
        { fullName, avatar },
        {
          onSuccess: () => {
            setAvatar(null);
            (e.target as HTMLFormElement).reset();
          },
        },
      );
    },
    [avatar, fullName, updateUser],
  );

  const handleCancel = useCallback(() => {
    setFullName(currentFullName);
    setAvatar(null);
  }, [currentFullName]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          disabled={isUpdating}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.item(0) ?? null)}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            onClick={handleCancel}
            disabled={isUpdating}
            type="reset"
            variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
