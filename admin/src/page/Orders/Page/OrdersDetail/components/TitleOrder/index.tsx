import { Order } from "../../../../../../interfaces/Orders";
import { Container } from "./styled";

interface Props {
  order: Order | null;
}

export const TitleOrder = ({ order }: Props) => {
  console.log(order);

  return (
    <Container>
      <div>Orden #{order?.id}</div>
      <div>{order?.createdAt}</div>
    </Container>
  );
};
