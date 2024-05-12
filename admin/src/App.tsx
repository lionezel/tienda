import styled from "styled-components";
import AppRouter from "./Navigation/page";

function App() {
  return (
    <Container>
      <AppRouter />
    </Container>
  );
}

export default App;

export const Container = styled.div`
  border: 1px solid #111;
  background-color: #f1f0f3;
`;
