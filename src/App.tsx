import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles.tsx';
import Button from './ui/Button.tsx';
import Input from './ui/Input.tsx';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: orangered;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis 🦚🏝️</H1>
        <Button onClick={() => alert(123)}>Check in</Button>
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
