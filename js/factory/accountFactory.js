/* jshint -W079 */
'use strict';

const $ = require('jQuery');
const FBCreds = require('../values/firebaseCreds');

let accountFactory = {};

// ajax requests
accountFactory.getOrder = function(key) {
  return new Promise(function(resolve, reject) {
    $.ajax(`${FBCreds.databaseURL}/ticket/${key}.json`)
    .done(function(result) {
      resolve(result);
    })
    .fail(function(error) {
      reject(error);
    });
  });
};

module.exports = accountFactory;
