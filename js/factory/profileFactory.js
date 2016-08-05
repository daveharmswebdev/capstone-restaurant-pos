'use strict';

let FBCreds = require('../values/firebaseCreds');

module.exports = function($q, $http, loginFactory) {

  let submitProfile = function(profile, key) {
    console.log('key is', key.length, (key.length === 0), profile);
    let config = {
      url: key.length === 0 ? `${FBCreds.databaseURL}/profile.json` : `${FBCreds.databaseURL}/profile/${key[0]}.json`,
      method: key.length === 0 ? 'POST' : 'PUT',
      data: JSON.stringify(profile)
    };
    console.log(config);
    return $q(function(resolve, reject) {
      $http(config)
      .success(function(response) {
        console.log(response);
        resolve(response);
      })
      .error(function(error) {
        console.log(error);
        reject(error);
      });
    });
  };

  let getProfile = function(uid) {
    console.log('get profile with', uid);
    return $q(function(resolve, reject) {
      $http.get(`${FBCreds.databaseURL}/profile.json?orderBy="uid"&equalTo="${uid}"`)
      .success(function(results) {
        console.log('profile factory: ', results);
        resolve(results);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let deleteProfile = function(profile) {
    console.log('delete profile with user', profile);
    return $q(function(resolve, reject) {
      $http.delete(`${FBCreds.databaseURL}/profile/${profile}.json`)
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
    getProfile,
    deleteProfile
  };
};
