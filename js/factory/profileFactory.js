'use strict';

let FBCreds = require('../values/firebaseCreds');

module.exports = function($http) {

  let submitProfile = function(profile) {
    console.log(profile);
    console.log(FBCreds.databaseURL);
  };

  let getProfile = function() {
    console.log('getting profile');
  };

  return {
    submitProfile,
    getProfile
  };
};
