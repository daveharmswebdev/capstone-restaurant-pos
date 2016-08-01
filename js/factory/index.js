'use strict';

var app = require('angular').module('pos');

app.factory('firebaseFactory', require('./firebaseFactory'));
app.factory('loginFactory', require('./loginFactory'));
app.factory('profileFactory', require('./profileFactory'));
app.factory('orderFactory', require('./orderFactory'));
