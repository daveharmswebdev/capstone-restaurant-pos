/* jshint -W079 */
'use strict';

const $ = require('jQuery');
const FBCreds = require('../values/firebaseCreds');

let factory = {};

// ajax requests
factory.getOrder = function(key) {
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

factory.cancel = function(key) {
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

factory.review = function(key) {
  return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${FBCreds.databaseURL}/ticket/${key}.json`,
        type: 'PATCH',
        dataType: 'json',
        data: JSON.stringify({ review: 5 })
      })
      .done(function(result) {
        resolve(result);
      })
      .fail(function(error) {
        reject(error);
      });
  });
};

factory.getCustomerHistory = function(uid) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${FBCreds.databaseURL}/ticket.json?orderBy="uid"&equalTo="${uid}"`,
      type: 'GET'
    })
    .done(function(history) {
      resolve(history);
    })
    .fail(function(error) {
      reject(error);
    });
  });
};

module.exports = factory;
