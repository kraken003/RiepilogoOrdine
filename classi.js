"use strict";
class Customer {
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
class Address {
    constructor(street, city, state, postalCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }
}
class OrderLineItem {
    constructor(id, product, amount, quantity) {
        this.id = id;
        this.product = product;
        this.amount = amount;
        this.quantity = quantity;
    }
}
class Order {
    constructor(orderNumber, orderDate, totalAmount, orderLineItems) {
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderLineItems = orderLineItems;
    }
}
class Product {
    constructor(code, name, variants, description, price, retailer) {
        this.code = code;
        this.name = name;
        this.variants = variants;
        this.description = description;
        this.price = price;
        this.retailer = retailer;
    }
}
