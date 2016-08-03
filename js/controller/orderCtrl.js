'use strict';

module.exports = function($scope, orderFactory, $location) {
  // pulls menu items on screen load
  $scope.menu = [];
  $scope.ticket = [];
  $scope.items = 0;
  $scope.subtotal = 0;
  $scope.subtotalString = 'Subtotal:  '

  orderFactory.getMenu()
  .then(function(menuData) {
    $scope.menu = Object.keys(menuData).map(key => menuData[key]);
    console.log($scope.menu);
  })
  .catch(function(error) {
    console.log(error);
  });

  $scope.checkOut = function() {
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

  $scope.delete = function(selection, $index) {
    console.log('delete', selection, $index);
    $scope.items -= 1;
    $scope.subtotal -= $scope.ticket[$index].price;
    $scope.ticket.splice($index,1);
  };
};
