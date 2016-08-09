// 'use strict';
//
// const mockReport = require('../archive/mockReport');
//
// describe('myController', function() {
//   let rootScope, scope, controller, serviceMock;
//
//   beforeEach(angular.mock.module('pos'));
//
//   beforeEach(inject(function($rootScope, $controller, $q) {
//     rootScope = $rootScope;
//     scope = $rootScope.$new();
//     controller = $controller;
//
//     serviceMock = {
//       getFoo: function() {
//         var deferred = $q.defer();
//         deferred.resolve(mockReport);
//         return deferred.promise;
//       }
//     };
//
//   }));
//
//   it('should call myService and set result in the scope', function() {
//       controller('myController', {$scope: scope, myService: serviceMock});
//       scope.$digest();
//       // var prettier = angular.mock.dump($scope);
//       console.log('anything', scope);
//       expect(scope.grandTotal).toBe(411.81);
//   });
// });
