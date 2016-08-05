'use strict';

module.exports = function($scope, profileFactory, $location, loginFactory) {
  let user = loginFactory.getCurrentUser();
  let key;
  console.log(user);
  profileFactory.getProfile(user.uid)
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

  // if key is still null then use
  $scope.submit = function() {
    let accountInfo = $scope.accountInfo;
    console.log(accountInfo);
    accountInfo.uid = user.uid;
    accountInfo.email = user.email;
    console.log('submit address information', accountInfo);
    profileFactory.submitProfile(accountInfo, key)
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
