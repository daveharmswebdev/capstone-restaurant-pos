'use strict';

module.exports = function($scope, orderFactory) {
  console.log('checout ctrl');
  console.log(orderFactory.getCurrentTicket());
  // $scope.ticket = orderFactory.getCurrentTicket();
  $scope.ticket = [
    { name: "Pad Thai", price: 9},
    { name: "Fried Rice", price: 8},
    { name: "Kao Prow", price: 9},
    { name: "Tom Kka Gai", price: 7},
    { name: "Spring Rolls", price: 5}
  ];
};
