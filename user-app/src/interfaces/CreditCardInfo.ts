export interface CreditCardInfo {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
}

export interface BillingDetails {
    name?: string;
    email?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  }