/* jshint -W079 */
'use strict';

require('angular');
require('angular-route');

let app = angular.module('pos', ['ngRoute']);

require('./controller');
require('./factory');

app.config(function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: './views/login.html',
    controller: 'loginCtrl'
  })
  .when('/profile', {
    templateUrl: './views/customerProfile.html',
    controller: 'profileCtrl'
  })
  .when('/user', {
    templateUrl: './views/order.html',
    controller: 'orderCtrl'
  })
  .when('/test', {
    templateUrl: './views/test.html',
    controller: 'testCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
