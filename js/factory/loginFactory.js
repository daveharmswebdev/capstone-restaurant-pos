'use strict';

module.exports = function(firebaseFactory, $timeout) {
  let firebase = firebaseFactory.fbInstance;
  let currentUser = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      console.log('user logged in', user.uid);
      currentUser = user.id;
    } else {
      console.log('no user logged in');
    }
  });

  let createAccount = function(email, password) {
    console.log('made it to loginFactory', email, password);
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  let getCurrentUser = () => currentUser;

  return {
    createAccount,
    getCurrentUser
  };
};
