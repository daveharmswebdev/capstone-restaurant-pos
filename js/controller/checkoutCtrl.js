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
  let ticketArray = [
    { name: "Pad Thai", price: 9},
    { name: "Fried Rice", price: 8},
    { name: "Kao Prow", price: 9},
    { name: "Tom Kka Gai", price: 7},
    { name: "Spring Rolls", price: 5}
  ];
  $scope.subtotal = 38;
  $scope.tax = 4.18;
  $scope.completeTicket = function() {
    let ticket = {};
    ticket.email = $scope.currentUser.email;
    ticket.uid = $scope.currentUser.uid;
    ticket.lastName = $scope.profile.lastName;
    ticket.firstName = $scope.profile.firstName;
    ticket.streetAddress = $scope.profile.streetAddress;
    ticket.city = $scope.profile.city;
    ticket.state = $scope.profile.state;
    $scope.zip = $scope.profile.zip;
    ticket.order = ticketArray;
    ticket.subtotal = $scope.subtotal;
    ticket.tax = $scope.tax;
    ticket.grandTotal = $scope.grandTotal;
    ticket.timestamp = Date.now();
    return ticket;
  };
  $scope.delivery = function() {
    let ticket = $scope.completeTicket();
    ticket.delivery = true;
    orderFactory.postTicket(ticket)
    .then(function(result) {
      console.log(result);
    });
  };
  $scope.pickup = function() {
    console.log('pickup');
  };
};
