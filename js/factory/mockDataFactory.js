'use strict';

const cust = require('./mockCustomers');

let mock = {};

function getHours() {
  let hours = [11,11,11,12,12,12,12,13,14,15,16,16,17,17,17,18,18,18,18,19,19,19,20,20,20,21,21];
  let n = Math.floor(Math.random() * 27);
  return hours[n];
}

function getMockOrder() {
  let mockOrder = {};
  let mockCust = cust.getCustomer();
  mockOrder.city = 'Nashville';
  mockOrder.delivery = Math.random() > 0.4 ? true : false;
  mockOrder.firstName = mockCust.firstName;
  mockOrder.lastName = mockCust.lastName;
  mockOrder.email = mockCust.email;
  mockOrder.state = 'TN';
  mockOrder.status = Math.random() > 0.95 ? 'cancelled' : 'complete';
  return mockOrder;
}

mock.getData = function(mockDate) {
  let tempDate = new Date(mockDate);
  for (let x = 0; x < 1; x++) {
    tempDate.setDate(tempDate.getDate() + 1);
    let customers = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < customers; i++) {
      tempDate.setHours(getHours(), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
      let mockOrder = getMockOrder(tempDate);
      console.log(mockOrder);
    }
  }
};

module.exports = mock;
