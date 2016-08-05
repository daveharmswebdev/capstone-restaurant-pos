/* jshint -W079*/
'use strict';

const $ = require('jQuery');
const FBCreds = require('../values/firebaseCreds');

let factory = {};

factory.getOrders = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${FBCreds.databaseURL}/ticket.json`,
      type: 'GET'
    }).
    done(function(results) {
      resolve(results);
    })
    .fail(function(error) {
      reject(error);
    });
  });
};

module.exports = factory;
