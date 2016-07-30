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
  .otherwise({
    redirectTo: '/'
  });
});
