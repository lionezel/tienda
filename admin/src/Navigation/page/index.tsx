import { Route, Routes } from "react-router-dom";
import {
  CreateProduct,
  Deliverys,
  Home,
  Orders,
  Qr,
  ShowProducts,
  UpdateProduct,
  Users,
} from "../../page";

import styled from "styled-components";
import { OrderDetails, OrdersCompleted } from "../../page/Orders/Page";
import { NavAdmin, Navbar } from "../../shared";
import { CreateQr } from "../../page/Qr/components";

const AppRouter = () => {
  return (
    <Container>
      <Navbar />
      <NavAdmin />
      <Routes>
        <Route path="/" Component={Home} />

        <Route path="/Products" Component={ShowProducts} />
        <Route path="/createProduct" Component={CreateProduct} />
        <Route path="/updateProduct/:id" Component={UpdateProduct} />

        <Route path="/Orders" Component={Orders} />
        <Route path="/ordercompleted" Component={OrdersCompleted} />
        <Route path="/Orders/:orderId" Component={OrderDetails} />

        <Route path="/Qr" Component={Qr} />
        <Route path="/CreateQr" Component={CreateQr} />

        <Route path="/users" Component={Users} />

        <Route path="/deliverys" Component={Deliverys} />
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
