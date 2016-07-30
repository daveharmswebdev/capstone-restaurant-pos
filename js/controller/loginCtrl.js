'use strict';

module.exports = function($scope, loginFactory) {
  $scope.signUp = function() {
    if (event.keyCode === 13) {
      console.log('sign in with', event.type, event);
    } else if (event.type === 'click') {
      console.log(isValid($scope.credentials.email, $scope.credentials.password));
      console.log('sign in with', event.type, event);
    }
    // loginFactory.createAccount($scope.credentials.email, $scope.credentials.password);
  };
  $scope.login = function() {
    console.log('login in with', $scope.credentials);
  };
  let isValid = function(email,password) {
    return true;
  };
};
