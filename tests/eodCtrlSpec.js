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

  it('should call have eodGrandTotal, eodSubTotal, eodTax, eodTotalItems, eodDate defined', function() {
      controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
      scope.$digest();
      expect(scope.eodGrandTotal).toBeDefined();
      expect(scope.eodSubTotal).toBeDefined();
      expect(scope.eodTax).toBeDefined();
      expect(scope.eodTotalItems).toBeDefined();
      expect(scope.eodDate).toBeDefined();
  });

  it('should be able to calculate GrandTotal, subtotal, tax, and total items', function() {
    controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
    scope.$digest();
    let prettier = angular.mock.dump(scope);
    console.log(prettier);
    expect(scope.eodGrandTotal).toBe(411.81);
    expect(scope.eodSubTotal).toBe(371);
    expect(scope.eodTax).toBe(40.81);
    expect(scope.eodTotalItems).toBe(46);
  });

  it('should be able to convert milliseconds time stamp to UTC date', function() {
    controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
    scope.$digest();
    let prettier = angular.mock.dump(scope.orders[0]);
    console.log(prettier);
    prettier = angular.mock.dump(scope.orders[1]);
    console.log(prettier);
    prettier = angular.mock.dump(scope.orders[2]);
    console.log(prettier);
  });
});
