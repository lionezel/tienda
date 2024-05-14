import { Route, Routes } from "react-router-dom";
import {
  CreateProduct,
  Home,
  Orders,
  ShowProducts,
  UpdateProduct,
  Users,
} from "../../page";

import styled from "styled-components";
import { OrderDetails, OrdersCompleted } from "../../page/Orders/Page";
import { NavAdmin, Navbar } from "../../shared";


const AppRouter = () => {
  return (
    <Container>
       <Navbar />
      <NavAdmin />
        <Routes>
          <Route path="/" Component={Home} />

          <Route path="/Products" Component={ShowProducts} />
          <Route path="/Products/createProduct" Component={CreateProduct} />
          <Route path="/Products/updateProduct/:id" Component={UpdateProduct} />

          <Route path="/Orders" Component={Orders} />
          <Route path="/Orders/completed" Component={OrdersCompleted} />
          <Route path="/Orders/:orderId" Component={OrderDetails} />

          <Route path="/users" Component={Users} />

        </Routes>

    </Container>
  );
};

export default AppRouter;

export const Container = styled.div`
  display: flex;
  margin: -8px;
  background-color: #f1f0f3;
`;
