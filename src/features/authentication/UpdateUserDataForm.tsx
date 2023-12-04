import { SyntheticEvent, useCallback, useState } from 'react';

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
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [, setAvatar] = useState<File | null>(null);

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.item(0) ?? null)}
        />
      </FormRow>

      <FormRow>
        <>
          <Button type="reset" variation="secondary">
            Cancel
          </Button>
          <Button>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
