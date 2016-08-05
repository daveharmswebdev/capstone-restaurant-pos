'use strict';

module.exports = function($scope, profileFactory, $location, loginFactory) {
  let user = loginFactory.getCurrentUser().uid;
  let key;
  console.log(user);
  profileFactory.getProfile(user)
  .then(function(result) {
    console.log(result.uid);
    key = Object.keys(result);
    let profile = result[key];
    console.log(profile);
    $scope.accountInfo = profile;
  })
  .catch(function(error) {
    console.log(error);
  });
  $scope.submit = function() {
    console.log('submit address information', $scope.accountInfo);
    profileFactory.submitProfile($scope.accountInfo)
    .then(function() {
      $location.url('/order');
    });
  };
  $scope.deleteAccount = function() {
    profileFactory.deleteProfile(key)
    .then(function(results) {
      console.log(results);
      $location.path('/login').replace();
      $scope.$apply();
    });
  };
};
