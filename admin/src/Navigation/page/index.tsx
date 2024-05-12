import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CreateProduct,
  Home,
  Orders,
  ShowProducts,
  UpdateProduct,
} from "../../page";

import { Navbar } from "../../shared";

import styled from "styled-components";
import { OrderDetails, OrdersCompleted } from "../../page/Orders/Page";

const AppRouter = () => {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/Products" Component={ShowProducts} />
          <Route path="/Products/createProduct" Component={CreateProduct} />
          <Route path="/Products/updateProduct/:id" Component={UpdateProduct} />
          <Route path="/Orders" Component={Orders} />
          <Route path="/Orders/completed" Component={OrdersCompleted} />
          <Route path="/Orders/:orderId" Component={OrderDetails} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default AppRouter;

export const Container = styled.div`
  display: flex;
  margin: -8px;
  background-color: #f1f0f3;
`;
