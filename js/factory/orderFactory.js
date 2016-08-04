'use strict';

let FBCreds = require('../values/firebaseCreds');

module.exports = function($q, $http) {
  let currentTicket = null;
  let editKey = null;

  let setCurrentTicket = (ticket) => currentTicket = ticket;
  let getCurrentTicket = () => currentTicket;
  let setKey = function(key) {
    editKey = key;
  };
  let getEditKey = () => editKey;
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
    let configUrl;
    if (editKey === null) {
      configUrl = `${FBCreds.databaseURL}/ticket.json`;
    } else {
      configUrl = `${FBCreds.databaseURL}/ticket/${editKey}.json`;
    }
    return $q(function(resolve, reject) {
      $http({
        url: configUrl,
        method: editKey === null ? 'POST' : 'PUT',
        data: JSON.stringify(ticket)
      })
      .success(function(response) {
        resolve(response);
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
    setKey,
    getEditKey
  };
};
