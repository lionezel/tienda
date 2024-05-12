import { Product } from "./Products";

export interface Orders {
    state: string;
    OpcionDeEntrega?: string,
    paymentMethod?: string,
    products: Product[],
    user_uid: string,
    value?: number | Card[]
    totalDelProducto: number
}

interface Card {
    cardNumber: number
    cvv: number
    expirationDate: number
}