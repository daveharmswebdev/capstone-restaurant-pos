'use strict';

var app = require('angular').module('pos');

app.factory('firebaseFactory', require('./firebaseFactory'));
app.factory('loginFactory', require('./loginFactory'));
