import { BrowserRouter, Route, Routes } from "react-router-dom";

import styled from "styled-components";
import Login from "../Login";

const AppRouterLogin = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default AppRouterLogin;

export const Container = styled.div`
  display: flex;
  margin: -8px;
`;
