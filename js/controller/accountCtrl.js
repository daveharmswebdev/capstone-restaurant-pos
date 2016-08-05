'use strict';

const accountFactory = require('../factory/accountFactory');

module.exports = function($scope, loginFactory, profileFactory, $route, orderFactory, $location) {
  $scope.currentUser = loginFactory.getCurrentUser();
  $scope.profile = null;
  $scope.history = [];
  profileFactory.getProfile($scope.currentUser.uid)
  .then(function(profile) {
    let key = Object.keys(profile);
    $scope.profile = profile[key];
    console.log('current profile', $scope.profile);
  });
  accountFactory.getCustomerHistory($scope.currentUser.uid)
  .then(function(history) {
    console.log(history);
    let array = [];
    Object.keys(history).forEach( key => array.push(modifyForDisplay(history[key], key)));
    array.sort(function(a,b) {
      if(a.timestamp < b.timestamp) {
        return 1;
      }
      if(a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    });
    $scope.history = array;
    $scope.$apply();
    console.log('after', $scope.history);
  })
  .catch(function(error) {
    console.log(error);
  });
  console.log('current user', $scope.currentUser);
  function modifyForDisplay(order, key) {
    let modifiedOrder = order;
    modifiedOrder.key = key;
    let options = {};
    options.hour12 = true;
    options.second = false;
    modifiedOrder.datestamp = new Date(modifiedOrder.timestamp).toLocaleDateString("en-US");
    modifiedOrder.timestring = new Date(modifiedOrder.timestamp).toLocaleTimeString("en-US");
    return modifiedOrder;
  }
  $scope.cancel = function(order) {
    console.log('cancel', order);
    accountFactory.cancel(order.key)
    .then(function(result) {
      console.log(result);
      $route.reload();
    })
    .catch(function(error) {
      console.log(error.statusText, error.responseText);
    });
  };
  $scope.edit = function(order) {
    console.log('edit', order);
    orderFactory.setKey(order.key);
    orderFactory.setCurrentTicket(order.order);
    $location.url('/order');
  };
  $scope.review = function(order) {
    accountFactory.review(order.key)
    .then(function(result) {
      $route.reload();
    })
    .catch(function(error) {
      console.log(error.statusText, error.responseText);
    });
  };
};
