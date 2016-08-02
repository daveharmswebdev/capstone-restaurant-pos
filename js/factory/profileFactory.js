'use strict';

let FBCreds = require('../values/firebaseCreds');

module.exports = function($q, $http, loginFactory) {

  let submitProfile = function(profile) {
    profile.email = loginFactory.getCurrentUser().email;
    profile.uid = loginFactory.getCurrentUser().uid;
    return $q(function(resolve, reject) {
      $http.post(`${FBCreds.databaseURL}/profile.json`, JSON.stringify(profile))
      .success(function(response) {
        resolve(response);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let getProfile = function(uid) {
    console.log('get profile with', uid);
    return $q(function(resolve, reject) {
      $http.get(`${FBCreds.databaseURL}/profile.json?orderBy="uid"&equalTo="${uid}"`)
      .success(function(results) {
        resolve(results);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  return {
    submitProfile,
    getProfile
  };
};
