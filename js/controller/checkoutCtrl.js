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
    ticket.status = 1; // 1 means active, 0 means cancel, 2 mean complete
    return ticket;
  };
  $scope.delivery = function() {
    let ticket = $scope.completeTicket();
    ticket.delivery = true;
    let method = 'POST';
    orderFactory.postTicket(ticket, method)
    .then(function(result) {
      console.log(result);
    });
  };
  $scope.pickup = function() {
    console.log('pickup');
  };
};
