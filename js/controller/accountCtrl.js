'use strict';

module.exports = function($scope, loginFactory, profileFactory, orderFactory) {
  $scope.currentUser = loginFactory.getCurrentUser();
  $scope.profile = null;
  $scope.history = [];
  profileFactory.getProfile($scope.currentUser.uid)
  .then(function(profile) {
    let key = Object.keys(profile);
    $scope.profile = profile[key];
    console.log('current profile', $scope.profile);
  });
  orderFactory.getCustomerHistory($scope.currentUser.uid)
  .then(function(history) {
    let array = [];
    Object.keys(history).forEach( key => array.push(modifyForDisplay(history[key], key)));
    $scope.history = array;
    console.log($scope.history);
  })
  .catch(function(error) {
    console.log(error);
  });
  console.log('current user', $scope.currentUser);
  function modifyForDisplay(order, key) {
    let modifiedOrder = order;
    modifiedOrder.key = key;
    modifiedOrder.timestamp = new Date(modifiedOrder.timestamp).toLocaleDateString("en-US");
    return modifiedOrder;
  }
  $scope.cancel = function(order) {
    console.log('cancel', order);
  };
  $scope.edit = function(order) {
    console.log('edit', order);
  };
};
