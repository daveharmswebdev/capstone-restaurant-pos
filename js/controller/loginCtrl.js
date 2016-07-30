'use strict';

module.exports = function($scope, loginFactory) {
  $scope.signUp = function() {
    console.log('sign in with', $scope.credentials);
    loginFactory.createAccount($scope.credentials.email, $scope.credentials.password);
  };
  $scope.login = function() {
    console.log('login in with', $scope.credentials);
  };
};
