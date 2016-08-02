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

  return {
    getMenu,
    setCurrentTicket,
    getCurrentTicket
  };
};
