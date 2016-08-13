'use strict';

// const reportFactory = require('../factory/reportFactory');

module.exports = function($scope, reportFactory) {
  $scope.orders = [];
  $scope.eodGrandTotal = 0;
  $scope.eodSubTotal = 0;
  $scope.eodTax = 0;
  $scope.eodTotalItems = 0;
  // $scope.eodDate = null;

  $scope.getData = function() {
    $scope.orders = [];
    $scope.eodGrandTotal = 0;
    $scope.eodSubTotal = 0;
    $scope.eodTax = 0;
    $scope.eodTotalItems = 0;
    // $scope.eodDate = null;
    let sDate = new Date($scope.sDate);
    sDate = Date.parse(sDate);
    let eDate = sDate + 86400000;

    reportFactory.getOrders(sDate, eDate)
    .then(function(results) {
      let keys = Object.keys(results);
      keys.forEach( key => results[key].key = key);
      keys.forEach( key => results[key].show = false);
      keys.forEach(key => $scope.orders.push(results[key]));
      // $scope.orders = $scope.orders.map(order => order.timestamp = new Date(order.timestamp))
      sortOrders();
      getReports();
      getSubreports();
      $scope.eodGrandTotal = parseFloat($scope.eodGrandTotal.toFixed(2));
      $scope.eodSubTotal = parseFloat($scope.eodSubTotal.toFixed(2));
      $scope.eodTax = parseFloat($scope.eodTax.toFixed(2));
      $scope.orders.forEach(function(order) {
        let timeStampString = new Date(order.timestamp);
        order.timeStampString = timeStampString.toString();
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  function getSubreports() {
    let items = {};
    items.friedRice = 0;
    items.greenCurry = 0;
    items.mangoSweetRice = 0;
    items.padThai = 0;
    items.satay = 0;
    items.redCurry = 0;
    items.springRolls = 0;
    items.ssPork = 0;
    items.tomKhaGai = 0;
    $scope.cancelled = $scope.orders.filter( order => order.status === 'cancelled').length;
    $scope.delivered = $scope.orders.filter( order => order.delivery === true).length;
    $scope.pickedup = $scope.orders.filter( order => order.delivery === false).length;
    $scope.orders.forEach(function(order) {
      order.order.forEach( item => {
        if (item.name === 'Fried Rice') {items.friedRice += 1;}
        else if (item.name === 'Green Curry') {items.greenCurry += 1;}
        else if (item.name === 'Mangos and Sweet Rice') {items.mangoSweetRice += 1;}
        else if (item.name === 'Pad Thai') {items.padThai += 1;}
        else if (item.name === 'Satay') {items.satay += 1;}
        else if (item.name === 'Spring Rolls') {items.springRolls += 1;}
        else if (item.name === 'Tom Kha Gai') {items.tomKhaGai += 1;}
        else if (item.name === 'Red Curry') {items.redCurry += 1;}
        else if (item.name === 'Sweet and Sour Pork') {items.ssPork += 1;}
      });
    });
    $scope.items = items;
    console.log($scope.items);
  }

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
  }
};
