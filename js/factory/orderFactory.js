'use strict';

let FBCreds = require('../values/firebaseCreds');

module.exports = function($q, $http) {
  let currentTicket = null;

  let setCurrentTicket = ticket => currentTicket = ticket;
  let getCurrentTicket = () => currentTicket;
  let getSubTotal = function() {
    let x = 0;
    currentTicket.forEach((item) => x += item.price);
    return x;
  };
  let getTotals = function() {
    let totals = {};
    totals.subTotal = getSubTotal();
    totals.tax = totals.subTotal * 0.11;
    totals.tax = parseFloat(totals.tax.toFixed(2));
    totals.grandTotal = totals.subTotal + totals.tax;
    return totals;
  };

  let getMenu = function() {
    return $q(function(resolve, reject) {
      $http.get(`${FBCreds.databaseURL}/menu.json`)
      .success(function(menuData) {
        resolve(menuData);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let postTicket = function(ticket) {
    console.log('postTicket', ticket);
    return $q(function(resolve, reject) {
      $http.post(`${FBCreds.databaseURL}/ticket.json`, JSON.stringify(ticket))
      .success(function(response) {
        resolve(response);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let getCustomerHistory = function(uid) {
    console.log(`getting history with ${uid}`);
    return $q(function(resolve, reject) {
      $http.get(`${FBCreds.databaseURL}/ticket.json?orderBy="uid"&equalTo="${uid}"`)
      .success(function(history) {
        resolve(history);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  return {
    getMenu,
    getTotals,
    postTicket,
    setCurrentTicket,
    getCurrentTicket,
    getCustomerHistory
  };
};
