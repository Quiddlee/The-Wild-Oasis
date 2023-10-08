import React from 'react';

import toast from 'react-hot-toast';

import useSettings from './useSettings.ts';
import useUpdateSetting from './useUpdateSetting.ts';
import { FormSettingsKeys } from '../../services/apiSettings.ts';
import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';
import Spinner from '../../ui/Spinner.tsx';

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  if (!settings) {
    toast.error('Cannot load setting values');
    return null;
  }

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    updateField: FormSettingsKeys,
  ) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [updateField]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={settings.minBookingLength}
          type="number"
          id="min-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={settings.maxBookingLength}
          type="number"
          id="max-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={settings.maxGuestsPerBooking}
          type="number"
          id="max-guests"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          defaultValue={settings.breakfastPrice}
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
