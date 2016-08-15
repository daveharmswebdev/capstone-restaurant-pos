/* jshint -W079 */
'use strict';

const cust = require('./mockCustomers');
const $ = require('jQuery');
const FBCreds = require('../values/firebaseCreds');

let mock = {};

function getHours() {
  let hours = [11,11,11,12,12,12,12,13,14,15,16,16,17,17,17,18,18,18,18,19,19,19,20,20,20,21,21];
  let n = Math.floor(Math.random() * 27);
  return hours[n];
}

function getOrder() {
  let x = Math.floor(Math.random() * 100);
  let numItems = getNumItems(x);
  let order = [];
  for (let x = 0; x < numItems; x++) {
    order.push(getItem());
  }
  return order;
}

function getItem() {
  let x = Math.floor(Math.random() * 21);
  let menu = [
    {"name": "Pad Thai","price": 8},
    {"name": "Pad Thai","price": 8},
    {"name": "Pad Thai","price": 8},
    {"name": "Pad Thai","price": 8},
    {"name": "Pad Thai","price": 8},
    {"name": "Spring Rolls","price": 3},
    {"name": "Spring Rolls","price": 3},
    {"name": "Tom Kha Gai","price": 5},
    {"name": "Tom Kha Gai","price": 5},
    {"name": "Fried Rice","price": 8},
    {"name": "Fried Rice","price": 8},
    {"name": "Fried Rice","price": 8},
    {"name": "Fried Rice","price": 8},
    {"name": "Mangos and Sweet Rice","price": 4},
    {"name": "Green Curry","price": 10},
    {"name": "Green Curry","price": 10},
    {"name": "Red Curry","price": 10},
    {"name": "Red Curry","price": 10},
    {"name": "Red Curry","price": 10},
    {"name": "Satay","price": 5},
    {"name": "Sweet and Sour Pork","price": 9}
  ];
  return menu[x];
}

function getNumItems(x) {
  if (x < 3) {
    return 10;
  } else if (x > 2 && x < 6) {
    return 9;
  } else if (x > 5 && x < 9) {
    return 8;
  } else if (x > 8 && x < 12) {
    return 7;
  } else if (x > 11 && x < 16) {
    return 6;
  } else if (x > 15 && x < 20) {
    return 5;
  } else if (x > 19 && x < 30) {
    return 4;
  } else if (x > 29 && x < 40) {
    return 3;
  } else if (x > 39 && x < 70) {
    return 2;
  } else {
    return 1;
  }
}

function getSubtotal(order) {
  let subtotal = 0;
  order.forEach( item => subtotal += item.price);
  return subtotal;
}

function getMockOrder(tempDate) {
  let mockOrder = {};
  let mockCust = cust.getCustomer();
  mockOrder.city = 'Nashville';
  mockOrder.delivery = Math.random() > 0.4 ? true : false;
  mockOrder.email = mockCust.email;
  mockOrder.firstName = mockCust.firstName;
  mockOrder.lastName = mockCust.lastName;
  mockOrder.state = 'TN';
  mockOrder.status = Math.random() > 0.95 ? 'cancelled' : 'complete';
  mockOrder.streetAddress = '123 Any Street';
  mockOrder.order = getOrder();
  mockOrder.subtotal = getSubtotal(mockOrder.order);
  mockOrder.tax = parseFloat((mockOrder.subtotal * 0.11).toFixed(2));
  mockOrder.grandTotal = mockOrder.subtotal + mockOrder.tax;
  mockOrder.utc = tempDate.toUTCString()
  mockOrder.timestamp = Date.parse(tempDate);
  mockOrder.uid = "GcRXsxr023elJ2gxUpe1VV8iWYC3";
  mockOrder.zip = '37215';
  return mockOrder;
}

mock.getData = function(mockDate, days) {
  console.log('mock.getData');
  let tempDate = new Date(mockDate);
  for (let x = 0; x < days; x++) {
    tempDate.setDate(tempDate.getDate() + 1);
    console.log(tempDate);
    let customers = Math.floor(Math.random() * 10) + 25;
    for (let i = 0; i < customers; i++) {
      tempDate.setHours(getHours(), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
      let mockOrder = getMockOrder(tempDate);
      $.ajax({
        url: `${FBCreds.databaseURL}/ticket.json`,
        type: 'POST',
        data: JSON.stringify(mockOrder),
        dataType: 'json',
      })
      .done(function(response) {
        console.log(response);
      })
      .fail(function(error) {
        console.log(error);
      });
    }
  }
};

module.exports = mock;
