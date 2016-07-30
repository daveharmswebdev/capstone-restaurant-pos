'use strict';

let FBCreds = require('../values/firebaseCreds');
let firebase = require('firebase');

module.exports = function() {
  let config = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain,
    databaseURL: FBCreds.databaseURL,
    storageBucket: FBCreds.storageBucket
  };
  let fbInstance = firebase.initializeApp(config);

  return {
    fbInstance
  };
};
