import styled from "styled-components";
import useFetchOrderCompleted from "../../../../hook/useFetchOrderCompleted";
import { TableOrderCompleted } from "./components";

export const OrdersCompleted = () => {
  const orders = useFetchOrderCompleted();

  return (
    <Container>
      <div>OrdersCompleted</div> <TableOrderCompleted orders={orders} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 100px;
  margin-left: 15%;
  width: 85%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto;

  @media screen and (max-width: 900px) {
    margin-left: 0;
    width: 100%;
    padding-left: 80px;
    padding-right: 10px;
    overflowx: "auto";
  }
`;
