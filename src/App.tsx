import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles.tsx';
import Button from './ui/Button.tsx';
import Heading from './ui/Heading.tsx';
import Input from './ui/Input.tsx';
import Row from './ui/Row.tsx';

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis 🦚🏝️</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert(123)}>Check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert(123)}>
                Check out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
