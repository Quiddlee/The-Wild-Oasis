import SignupForm from '../features/authentication/SignupForm.tsx';
import Heading from '../ui/Heading.tsx';

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
