'use strict';

describe('loginCtrl', function() {

  // xdescribe('isValidEmail', function() {
  //   xit('should evaluate validity of email', function() {
  //     let $scope = {};
  //     let controller = $controller('loginCtrl', { $scope: $scope });
  //     $scope.email = 'test@test.com';
  //     $scope.password = 'Tes123qwe!';
  //     let prettier = angular.mock.dump($scope);
  //     expect($scope.isValidEmail()).toBe(0);
  //     expect($scope.isValidPassword()).toBe(0);
  //     $scope.password = "123qwe!@";
  //     expect($scope.isValidPassword()).toBe(1);
  //   });
  // });

  beforeEach(angular.mock.module('pos'));

  let $controller;

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('create ticket', function() {
    it('should be able to add items and prices', function() {
      let $scope = {};
      let controller = $controller('orderCtrl', { $scope: $scope });
      $scope.addItem({ name: "Pad Thai", price: 8});
      $scope.addItem({ name: "Green Curry", price: 9});
      $scope.addItem({ name: "Spring Rolls", price: 5});
      console.log($scope.ticket);
      console.log('subtotal', $scope.subtotal);
      expect($scope.items).toBe(3);
      expect($scope.subtotal).toBe(22);
    });
  });

});
