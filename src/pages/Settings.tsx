import UpdateSettingsForm from '../features/settings/UpdateSettingsForm.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
