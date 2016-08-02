'use strict';

let FBCreds = require('../values/firebaseCreds');

module.exports = function($q, $http) {
  let currentTicket = null;

  let setCurrentTicket = ticket => currentTicket = ticket;
  let getCurrentTicket = () => currentTicket;

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

  return {
    getMenu,
    postTicket,
    setCurrentTicket,
    getCurrentTicket
  };
};
