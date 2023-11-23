export class Customer {
    constructor(
      public id: string,
      public firstname: string,
      public lastname: string,
      public age: number,
      public email: string,
      public phone: string,
      public locale: string,
      public billingAddress: Address,
      public shippingAddress: Address
    ) {}
  }

  export class Address {
  constructor(
    public street: string,
    public city: string,
    public state: string,
    public postalCode: string
  ) {}
}

export class OrderLineItem {
    constructor(
      public id: string,
      public product: Product,
      public amount: number,
      public quantity: number
    ) {}
  }

export class Order {
    constructor(
      public orderNumber: string,
      public orderDate: Date,
      public totalAmount: number,
      public orderLineItems: OrderLineItem[]
    ) {}
  }

export class Product {
    constructor(
        public code: string,
        public name: string,
        public variants: string[],
        public description: string,
        public price: number,
        public retailer: string
    ) {}
}