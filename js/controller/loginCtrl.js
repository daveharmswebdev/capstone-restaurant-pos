'use strict';

module.exports = function($scope) {
  $scope.signIn = function() {
    console.log('sign in with', $scope.credentials);
  };
  $scope.login = function() {
    console.log('login in with', $scope.credentials);
  };
};
