/* jshint -W079*/
'use strict';

const FBCreds = require('../values/firebaseCreds');
const mock = require('../../archive/mockReport');

module.exports = function($q, $http) {

  let getOrders = function(start, end) {
    return $q(function(resolve, reject) {
      $http.get(`${FBCreds.databaseURL}/ticket.json?orderBy="timestamp"&startAt=${start}&endAt=${end}`)
      .success(function(results) {
        resolve(results);
      })
      .error(function(results) {
        reject(results);
      });
    });
  };

  return {
    getOrders
  };
};

// const $ = require('jQuery');
//
// let factory = {};
//
// factory.getOrders = function() {
//   return new Promise(function(resolve, reject) {
//     $.ajax({
//       url: `${FBCreds.databaseURL}/ticket.json`,
//       type: 'GET'
//     }).
//     done(function(results) {
//       console.log(results);
//       console.log(JSON.stringify(results));
//       resolve(results);
//     })
//     .fail(function(error) {
//       reject(error);
//     });
//   });
// };
//
// module.exports = factory;
