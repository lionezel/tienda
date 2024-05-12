import { Order } from "../../../../../../interfaces/Orders"
import { Container } from "./styled"

interface Props  {
    order: Order
}

export const UserData = ({ order }: Props) => {

  return (
    <Container>
      <div>
        Detalle del usuario
      </div>
        {order.name}
    </Container>
  )
}
