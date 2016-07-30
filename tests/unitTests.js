'use strict';

describe('loginCtrl', function() {

  beforeEach(angular.mock.module('pos'));

  let $controller;

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;

  }));

  describe('isValid', function() {
    it('should return evaluate validity of email and password', function() {
      let $scope = {};
      let controller = $controller('loginCtrl', { $scope: $scope });
      $scope.email = '1234';
      $scope.password = 'qwerty';
      let prettier = angular.mock.dump($scope);
      dump(prettier);
      expect($scope.isValid()).toBe(true);
    });
  });
});
