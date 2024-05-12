import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Order } from "../../../../../../../../interfaces/Orders";

const timelineItems = [
  {
    state: "pendiente",
    label: "Pendiente",
    description: "Esperando confirmación",
  },
  {
    state: "preparando",
    label: "Preparando",
    description: "Preparando el producto",
  },
  {
    state: "listo",
    label: "Listo",
    description: "El producto está listo para su entrega",
  },
  {
    state: "completado",
    label: "Completado",
    description: "El producto ha sido entregado",
  },
];

interface OrderState {
  [key: string]: Order;
}

export const TimeLine = ({
  orderState,
  orderId,
}: {
  orderState: OrderState;
  orderId: string | undefined;
}) => {
  return (
    <Timeline>
      {timelineItems.map((item) => (
        <TimelineItem key={item.state} style={{ width: "20%" }}>
          <TimelineSeparator>
            <TimelineDot
              color={
                orderId && orderState[orderId]?.state === item.state
                  ? "success"
                  : "grey"
              }
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div style={{ width: "200px" }}>{item.label}</div>
            <div style={{ width: "200px" }}>{item.description}</div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
