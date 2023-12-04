import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm.tsx';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm.tsx';
import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
