'use strict';

// const reportFactory = require('../factory/reportFactory');

module.exports = function($scope, reportFactory) {
  $scope.orders = [];
  $scope.eodGrandTotal = 0;
  $scope.eodSubTotal = 0;
  $scope.eodTax = 0;
  $scope.eodTotalItems = 0;
  $scope.eodDate = null;

  let startDate = new Date(2016,7,10);
  let endDate = new Date(2016,7,11);
  startDate = Date.parse(startDate);
  endDate = Date.parse(endDate);
  console.log(startDate);
  console.log(endDate);

  reportFactory.getOrders(startDate, endDate)
  .then(function(results) {
    let keys = Object.keys(results);
    keys.forEach( key => results[key].key = key);
    keys.forEach( key => results[key].show = false);
    keys.forEach(key => $scope.orders.push(results[key]));
    // $scope.orders = $scope.orders.map(order => order.timestamp = new Date(order.timestamp))
    sortOrders();
    getReports();
    $scope.eodGrandTotal = parseFloat($scope.eodGrandTotal.toFixed(2));
    $scope.eodSubTotal = parseFloat($scope.eodSubTotal.toFixed(2));
    $scope.eodTax = parseFloat($scope.eodTax.toFixed(2));
    $scope.orders.forEach(function(order) {
      let timeStampString = new Date(order.timestamp);
      order.timeStampString = timeStampString.toString();
    });
    console.log($scope.orders);
  })
  .catch(function(error) {
    console.log(error);
  });

  function sortOrders() {
    $scope.orders.sort(function(a, b) {
      if (a.timestamp > b.timestamp) {
        return 1;
      } else if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });
  }

  function getReports() {
    $scope.orders.forEach(function(order) {
      $scope.eodGrandTotal += parseFloat(order.grandTotal.toFixed(2));
      $scope.eodSubTotal += parseFloat(order.subtotal.toFixed(2));
      $scope.eodTax += parseFloat(order.tax.toFixed(2));
      $scope.eodTotalItems += order.order.length;
    });
    // $scope.eodGrandTotal = $scope.eodGrandTotal.toFixed(2);
    // $scope.eodSubTotal = $scope.eodSubTotal.toFixed(2);
    // $scope.eodTax = $scope.eodTax.toFixed(2);
  }
};
