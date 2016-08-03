/* jshint -W079 */
'use strict';

const $ = require('jQuery');
const FBCreds = require('../values/firebaseCreds');

let accountFactory = {};

// ajax requests
accountFactory.getOrder = function(key) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${FBCreds.databaseURL}/ticket/${key}.json`,
      type: 'GET'
    })
    .done(function(result) {
      resolve(result);
    })
    .fail(function(error) {
      reject(error);
    });
  });
};

accountFactory.cancel = function(key) {
  return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${FBCreds.databaseURL}/ticket/${key}.json`,
        type: 'PATCH',
        dataType: 'json',
        data: JSON.stringify({ status: "cancelled" })
      })
      .done(function(result) {
        resolve(result);
      })
      .fail(function(error) {
        console.log(error);
        reject(error);
      });
  });
};

module.exports = accountFactory;
