'use strict';

const $ = require('jQuery');
const FBCreds = require('../values/firebaseCreds');

module.exports = function($scope, profileFactory, $http) {
  $scope.test = function() {
    $.ajax('./mockData.json')
    .done(function(results) {
      results.forEach(function(result) {
        postData(result);
      });
    });
  };


  function postData(result) {
    for (let x = 1; x < 31; x++) {
      result.delivery = getDeliveryBoolean();
      result.status = getStatus();
      result.zip = "12345";
      result.uid = "GcRXsxr023elJ2gxUpe1VV8iWYC3";
      result.streetAddress = "123 Anywhere Road";
      result.order = getOrder();
      result.subtotal = getSubtotal(result.order);
      result.tax = (result.subtotal * 0.11).toFixed(2);
      result.tax = parseFloat(result.tax);
      result.grandTotal = result.subtotal + result.tax;
      result.timestamp = getTimeStamp(x);
      $.ajax({
        url: `${FBCreds.databaseURL}/test.json`,
        type: 'POST',
        data: JSON.stringify(result),
        dataType: 'json',
        success: function(response) {console.log(response);},
        error: function(error) {console.log(error);}
      });
    }
  }

  function getTimeStamp(x) {
    let hours = [11,11,11,12,12,12,12,13,14,15,16,16,17,17,17,18,18,18,18,19,19,19,20,20,20,21,21];
    let timeStamp = new Date(2016, 5, x);
    let n = Math.floor(Math.random() * 27);
    let ran60 = Math.floor(Math.random() * 60);
    timeStamp.setHours(hours[n], ran60, ran60);
    console.log(timeStamp);
    return Date.parse(timeStamp);
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

  function getDeliveryBoolean() {
    if (Math.floor(Math.random() * 100) + 1 > 60) {
      return true;
    } else {
      return false;
    }
  }

  function getStatus() {
    if (Math.floor(Math.random() * 100) + 1 > 95) {
      return "cancelled";
    } else {
      return "complete";
    }
  }

  $scope.testPost = function() {
    let profile = {
      uid: 'TAtsE0IF71SDgwz6VMwJcGs2AFq2',
      email: 'test@test.com',
      firstName: 'Joe',
      lastName: 'Smith',
      streetAddress: '123 Real Street',
      state: 'NY',
      zip: '12345'
    };

    profileFactory.submitProfile(profile)
    .then(function(response) {
      console.log(response);
    });
  };
};
