'use strict';

module.exports = function($scope, orderFactory, $location) {
  // pulls menu items on screen load
  $scope.menu = [];
  $scope.ticket = [];
  $scope.items = 0;
  $scope.subtotal = 0;

  orderFactory.getMenu()
  .then(function(menuData) {
    $scope.menu = Object.keys(menuData).map(key => menuData[key]);
  })
  .catch(function(error) {
    console.log(error);
  });

  $scope.checkout = function() {
    orderFactory.setCurrentTicket($scope.ticket);
    $location.url('/checkout');
  };

  $scope.addItem = function(item) {
      let x = {
        name: item.name,
        price: item.price
      };
      console.log('adding item.', x);
      $scope.ticket.push(x);
      $scope.items += 1;
      $scope.subtotal += item.price;
  };
};
