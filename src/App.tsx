import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles.tsx';
import Button from './ui/Button.tsx';
import Heading from './ui/Heading.tsx';
import Input from './ui/Input.tsx';

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis 🦚🏝️</Heading>
        <Heading as="h2">Check in and out</Heading>

        <Button onClick={() => alert(123)}>Check in</Button>
        <Input type="number" placeholder="Number of guests" />

        <Heading as="h3">Form</Heading>
      </StyledApp>
    </>
  );
}

export default App;
