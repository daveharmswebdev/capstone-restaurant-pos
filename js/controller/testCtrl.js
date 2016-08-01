'use strict';

module.exports = function($scope, profileFactory) {
  $scope.test = function() {
    let uid = "TAtsE0IF71SDgwz6VMwJcGs2AFq2";
    // profileFactory.getProfile();
    profileFactory.getProfile(uid)
    .then(function(results) {
      console.log(results);
    });
  };
  $scope.testPost = function() {
    let profile = {
      uid: 'TAtsE0IF71SDgwz6VMwJcGs2AFq2',
      email: 'test@test.com',
      firstName: 'Joe',
      lastName: 'Smith',
      streetAddress: '123 Real Street',
      state: 'NY',
      zip: '12345'
    };

    profileFactory.submitProfile(profile)
    .then(function(response) {
      console.log(response);
    });
  };
};
