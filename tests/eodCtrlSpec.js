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

  // xit('should call have eodGrandTotal, eodSubTotal, eodTax, eodTotalItems, eodDate defined', function() {
  //     controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
  //     scope.getData();
  //     scope.$digest();
  //     expect(scope.eodGrandTotal).toBeDefined();
  //     expect(scope.eodSubTotal).toBeDefined();
  //     expect(scope.eodTax).toBeDefined();
  //     expect(scope.eodTotalItems).toBeDefined();
  //     expect(scope.eodDate).toBeDefined();
  // });
  //
  // xit('should be able to calculate GrandTotal, subtotal, tax, and total items', function() {
  //   controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
  //   scope.getData();
  //   scope.$digest();
  //   expect(scope.eodGrandTotal).toBe(411.81);
  //   expect(scope.eodSubTotal).toBe(371);
  //   expect(scope.eodTax).toBe(40.81);
  //   expect(scope.eodTotalItems).toBe(46);
  // });

  it('should be able to convert milliseconds time stamp to UTC date', function() {
    controller('eodCtrl', {$scope: scope, reportFactory: serviceMock});
    scope.getData();
    scope.$digest();
    // let prettier = angular.mock.dump(scope.orders);
    // console.log(prettier);
    console.log('cancelled', scope.cancelled);
    console.log('delivered', scope.delivered);
    console.log('picked up', scope.pickedup);
    console.log('total tickets', scope.orders.length);
    console.log('items', scope.items);
    expect(scope.items.mangoSweetRice).toBe(2);
    expect(scope.items.friedRice).toBe(31);
  });
});
