import { ReactNode } from "react"

export interface Products {
    OpcionDeEntrega?: ReactNode
    paymentMethod?: ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product?: any
    quantity?: number
    id: string
    name: string
    price: number
    type: string
    stock: false
    imageURL: string
    description: string
    createdAt: string
}

