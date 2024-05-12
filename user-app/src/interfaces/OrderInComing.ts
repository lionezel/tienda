import { Orders } from "./Orders";

export interface OrderInComing {
    address: string;
    createdAt: string;
    email: string;
    id: string;
    name: string;
    products: Orders[];
    state: string;
    telefone: string;
    total: number;
    user_uid: string;
    OpcionDeEntrega: string;
  }