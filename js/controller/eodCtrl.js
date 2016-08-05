'use strict';

const reportFactory = require('../factory/reportFactory');


module.exports = function($scope) {
  $scope.orders = [];
  $scope.eodTotal = 0;
  $scope.eodTotalItems = 0;

  reportFactory.getOrders()
  .then(function(results) {
    let keys = Object.keys(results);
    keys.forEach(key => $scope.orders.push(results[key]));
    console.log($scope.orders[0]);
    getReports();
    $scope.eodTotal = $scope.eodTotal.toFixed(2);
    console.log($scope.eodTotal, $scope.eodTotalItems);
    $scope.$apply();
  })
  .catch(function(error) {
    console.log(error);
  });

  function getReports() {
    $scope.orders.forEach(function(order) {
      $scope.eodTotal += order.grandTotal;
      $scope.eodTotalItems += order.order.length;
      // eodTotalItems = orders.order.length;
    });
  }
};
