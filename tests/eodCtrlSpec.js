'use strict';

const mockReport = require('../archive/mockReport');

describe('eodCtrl', function() {
  let rootScope, scope, controller, serviceMock;

  beforeEach(angular.mock.module('pos'));

  beforeEach(inject(function($rootScope, $controller, $q) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;

    serviceMock = {
      getOrders: function() {
        var deferred = $q.defer();
        deferred.resolve(mockReport);
        return deferred.promise;
      }
    };

  }));

  it('should call reportFactory and set result in the scope', function() {
      controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
      scope.$digest();
      let prettier = angular.mock.dump(scope);
      console.log('anything', prettier);
      console.log('orders', scope.orders[0]);
      expect(parseFloat(scope.eodTotal)).toBe(411.81);
  });
});
