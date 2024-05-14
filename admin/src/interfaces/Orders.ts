import { Products } from "./Product";

export interface Order {
  id: string;
  address: string;
  name: string;
  products: Products[];
  total: number;
  state: string;
  createdAt: string;
}
