'use strict';

module.exports = function($scope, loginFactory) {
  $scope.badEmail = false;
  $scope.badPassword = false;
  $scope.signUp = function() {
    if ($scope.isValidEmail() === 0 & $scope.isValidPassword() === 0) {
      console.log('good credentials click', event.type);
      loginFactory.createAccount($scope.email, $scope.password);
    } else {
      console.log('bad email/pass');
    }
  };
  $scope.login = function() {
    console.log('login in with');
  };
  $scope.isValidEmail = function() {
    console.log('email', $scope.email);
    let valid = 0;
    valid += $scope.email.length > 2 ? 0 : 1;
    valid += /@/g.test($scope.email) ? 0 : 1;
    console.log(/(.com|.net|.org|.int|.edu|.gov|.mil|.de|.uk)/g.test($scope.email));
    valid += /(.com|.net|.org|.int|.edu|.gov|.mil|.de|.uk)/g.test($scope.email) ? 0 : 1;
    $scope.badEmail = valid > 0 ? true : false;
    return valid;
  };
  $scope.isValidPassword = function() {
    console.log('password', $scope.password);
    let valid = 0;
    valid += $scope.password.length > 5 ? 0 : 1;
    // needs a number
    valid += /[0-9]/g.test($scope.password) ? 0 : 1;
    // needs a special character
    valid += /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g.test($scope.password) ? 0 : 1;
    // needs uppercase
    valid += /[A-Z]/g.test($scope.password) ? 0 : 1;
    $scope.badPassword = valid > 0 ? true : false;
    return valid;
  };
};
