'use strict';

describe('loginCtrl', function() {

  beforeEach(angular.mock.module('pos'));

  let $controller;

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;

  }));

  xdescribe('isValidEmail', function() {
    it('should evaluate validity of email', function() {
      let $scope = {};
      let controller = $controller('loginCtrl', { $scope: $scope });
      $scope.email = 'test@test.com';
      $scope.password = 'Test1test@com';
      let prettier = angular.mock.dump($scope);
      expect($scope.isValidEmail()).toBe(0);
      expect($scope.isValidPassword()).toBe(0);
    });
  });
});
