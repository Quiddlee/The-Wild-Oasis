import toast from 'react-hot-toast';

import useSettings from './useSettings.ts';
import Form from '../../ui/Form.tsx';
import FormRow from '../../ui/FormRow.tsx';
import Input from '../../ui/Input.tsx';
import Spinner from '../../ui/Spinner.tsx';

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();

  if (isLoading) return <Spinner />;

  if (!settings) {
    toast.error('Cannot load settings');
    return null;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={settings.minBookingLength}
          type="number"
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={settings.maxBookingLength}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={settings.maxGuestsPerBooking}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={settings.breakfastPrice}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
