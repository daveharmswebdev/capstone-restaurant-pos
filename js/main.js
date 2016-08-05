/* jshint -W079 */
'use strict';

require('angular');
require('angular-route');

let app = angular.module('pos', ['ngRoute']);

require('./controller');
require('./factory');

app.config(function($routeProvider) {

  $routeProvider
  .when('/login', {
    templateUrl: './views/login.html',
    controller: 'loginCtrl'
  })
  .when('/profile', {
    templateUrl: './views/customerProfile.html',
    controller: 'profileCtrl'
  })
  .when('/order', {
    templateUrl: './views/order.html',
    controller: 'orderCtrl'
  })
  .when('/test', {
    templateUrl: './views/test.html',
    controller: 'testCtrl'
  })
  .when('/checkout', {
    templateUrl: './views/checkout.html',
    controller: 'checkoutCtrl'
  })
  .when('/account', {
    templateUrl: './views/account.html',
    controller: 'accountCtrl'
  })
  .when('/endOfDay', {
    templateUrl: './views/endOfDay.html',
    controller: 'eodCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
});
