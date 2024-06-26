import { Order } from "./Orders";

export interface OrderCompleted {
  createdAt: string;
  orderId: string;
  order: Order[];
  state: string;
  name: string;
  total: number;
}
