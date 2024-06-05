/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Container, Content } from "./styled";
import {
  PayMethod,
  StateOrder,
  TableProductOrder,
  TitleOrder,
  UserData,
} from "./components";
import useFetchOrder from "../../../../hook/useFetchOrder";


export const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string; action: string }>();
  const order = orderId ? useFetchOrder(orderId) : null;
 

  return (
    <div>
      <Container>
        <TitleOrder order={order} />
        <Content>
          {order && order.products && <TableProductOrder order={order} />}
          {order && <UserData order={order} />}
          {order && <StateOrder order={order} orderId={orderId} />}
          <PayMethod />
        </Content>
      </Container>
    </div>
  );
};

export default OrderDetails;
