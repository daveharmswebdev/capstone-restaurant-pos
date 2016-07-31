'use strict';

module.exports = function($scope, profileFactory) {
  $scope.submit = function() {
    console.log('submit address information', $scope.accountInfo);
    profileFactory.submitProfile($scope.accountInfo);
  };
};
