import styled from "styled-components";
import AppRouter from "./Navigation/page";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from "./shared";

import Login from "./page/auth/Login";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<>
        <Navbar />
        <AppRouter />
      </>} />
    </Routes>
  </Router>
  );
}

export default App;

export const Container = styled.div`
  border: 1px solid #111;
  background-color: #f1f0f3;
`;
