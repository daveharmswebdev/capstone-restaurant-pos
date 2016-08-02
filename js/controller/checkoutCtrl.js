'use strict';

module.exports = function($scope, orderFactory, loginFactory, profileFactory) {
  console.log('checout ctrl');
  console.log(orderFactory.getCurrentTicket());
  // $scope.ticket = orderFactory.getCurrentTicket();
  $scope.currentUser = loginFactory.getCurrentUser();
  console.log($scope.currentUser.uid);
  profileFactory.getProfile($scope.currentUser.uid)
  .then(function(profile) {
    let key = Object.keys(profile);
    $scope.profile = profile[key];
    console.log($scope.profile);
  });
  $scope.ticket = [
    { name: "Pad Thai", price: 9},
    { name: "Fried Rice", price: 8},
    { name: "Kao Prow", price: 9},
    { name: "Tom Kka Gai", price: 7},
    { name: "Spring Rolls", price: 5}
  ];
  $scope.subtotal = 38;
  $scope.delivery = function() {
    console.log('delivery');
  };
  $scope.pickup = function() {
    console.log('pickup');
  };
};
