export class Customer {
    constructor(id, firstname, lastname, age, email, phone, locale, billingAddress, shippingAddress) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.email = email;
        this.phone = phone;
        this.locale = locale;
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
    }
}
export class Address {
    constructor(street, city, state, postalCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }
}
export class OrderLineItem {
    constructor(id, product, amount, quantity) {
        this.id = id;
        this.product = product;
        this.amount = amount;
        this.quantity = quantity;
    }
}
export class Order {
    constructor(orderNumber, orderDate, totalAmount, orderLineItems) {
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderLineItems = orderLineItems;
    }
}
export class Product {
    constructor(code, name, variants, description, price, retailer) {
        this.code = code;
        this.name = name;
        this.variants = variants;
        this.description = description;
        this.price = price;
        this.retailer = retailer;
    }
}
var coloriCiabatte = ["rosa", "rosso", "blu"];
var prodotto1 = new Product("abc", "Ciabatte", coloriCiabatte, "Ciabatte belle", 45, "Ciccio&Co");
