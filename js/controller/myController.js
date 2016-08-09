'use strict';

module.exports = function($scope, myService) {
  myService.getFoo().
  then(function(result) {
    $scope.grandTotal = Object.keys(result);
  });
};
