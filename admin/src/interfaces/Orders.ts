import { Products } from "./Product";

export interface Order {
  user_uid: string
  id: string;
  address: string;
  name: string;
  products: Products[];
  total: number;
  state: string;
  createdAt: string;
}
