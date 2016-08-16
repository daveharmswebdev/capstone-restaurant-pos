'use strict';

module.exports = function($scope, $location, orderFactory, loginFactory, profileFactory) {
  $scope.currentUser = loginFactory.getCurrentUser();
  profileFactory.getProfile($scope.currentUser.uid)
  .then(function(profile) {
    let key = Object.keys(profile);
    $scope.profile = profile[key];
    console.log($scope.profile);
  });
  let removeHash = function(item) {
    delete item.$$hashKey;
    return item;
  };
  $scope.ticket = orderFactory.getCurrentTicket();
  $scope.subtotal = orderFactory.getTotals().subTotal;
  $scope.tax = orderFactory.getTotals().tax;
  $scope.grandTotal = orderFactory.getTotals().grandTotal;
  $scope.completeTicket = function() {
    let ticket = {};
    ticket.email = $scope.currentUser.email;
    ticket.uid = $scope.currentUser.uid;
    ticket.lastName = $scope.profile.lastName;
    ticket.firstName = $scope.profile.firstName;
    ticket.streetAddress = $scope.profile.streetAddress;
    ticket.city = $scope.profile.city;
    ticket.state = $scope.profile.state;
    ticket.zip = $scope.profile.zip;
    ticket.order = $scope.ticket.map(item => removeHash(item));
    ticket.subtotal = $scope.subtotal;
    ticket.tax = $scope.tax;
    ticket.grandTotal = $scope.grandTotal;
    ticket.timestamp = Date.now();
    ticket.status = 'active';
    return ticket;
  };
  $scope.submitOrder = function(deliver) {
    let ticket = $scope.completeTicket();
    ticket.delivery = deliver;
    orderFactory.postTicket(ticket)
    .then(function(result) {
      console.log(result);
      Materialize.toast('You have submitted your order!', 4000) 
      orderFactory.setCurrentTicket(null);
      orderFactory.setKey(null);
      $location.path('./login').replace();
    });
  };
  $scope.pickup = function() {
    console.log('pickup');
  };
};
