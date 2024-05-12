import styled from "styled-components";
import useFetchOrderCompleted from "../../../../hook/useFetchOrderCompleted";
import { TableOrderCompleted } from "./components";

export const OrdersCompleted = () => {
  const order = useFetchOrderCompleted();
  
  return (
    <Container>
      <div>OrdersCompleted</div> <TableOrderCompleted order={order} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  margin-left: 15%;
  width: 85%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto;
`;
