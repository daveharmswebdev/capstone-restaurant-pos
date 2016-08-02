'use strict';

module.exports = function($scope, loginFactory, $location) {
  // sets ng-show to true if password or email fail validation
  $scope.badEmail = false;
  $scope.badPassword = false;

  // uses loginFactory createAccount which uses firebase createEmailAccount method
  $scope.signUp = function() {
    // uses & instead of && to avoid short circuiting and invokes both
    // validation methods.
    console.log($scope.email, $scope.password);
    if ($scope.isValidEmail() === 0 & $scope.isValidPassword() === 0) {
      loginFactory.createAccount($scope.email, $scope.password)
      .then(function(response) {
        $location.url('/profile');
      });
      // $location.url('/profile');
    }
  };
  $scope.login = function() {
    console.log('login in with');
    loginFactory.loginEmail($scope.email, $scope.password)
    .then(function(response) {
      console.log(response);
    });
  };
  $scope.logout = function() {
    loginFactory.logoutUser()
    .then(function() {
      console.log('logout: user out!');
    });
  };
  $scope.isValidEmail = function() {
    let valid = 0;
    valid += $scope.email.length > 6 ? 0 : 1;
    // tests for @ symbol
    valid += /@/g.test($scope.email) ? 0 : 1;
    // tests for common TLDs
    valid += /(.com|.net|.org|.int|.edu|.gov|.mil|.de|.uk)/g.test($scope.email) ? 0 : 1;
    // if email bad will set to true and reveal bad email warning/instruction
    $scope.badEmail = valid > 0 ? true : false;
    return valid;
  };
  $scope.isValidPassword = function() {
    let valid = 0;
    valid += $scope.password.length > 5 ? 0 : 1;
    // needs a number
    valid += /[0-9]/g.test($scope.password) ? 0 : 1;
    // needs a special character
    valid += /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g.test($scope.password) ? 0 : 1;
    // needs uppercase
    valid += /[A-Z]/g.test($scope.password) ? 0 : 1;
    // if bad password will set to true and reveal bad password warning/instruction
    $scope.badPassword = valid > 0 ? true : false;
    return valid;
  };
};
