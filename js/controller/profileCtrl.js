'use strict';

module.exports = function($scope, profileFactory, $location) {
  $scope.submit = function() {
    console.log('submit address information', $scope.accountInfo);
    profileFactory.submitProfile($scope.accountInfo)
    .then(function() {
      $location.url('/order');
    });
  };
};
