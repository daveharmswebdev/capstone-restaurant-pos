'use strict';

module.exports = function(firebaseFactory, $timeout) {
  let firebase = firebaseFactory.fbInstance;
  let currentUser = null;

  // listens for firebase user change
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      currentUser = user.id;
    } else {
      console.log('no user logged in');
    }
  });

  let createAccount = function(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  let getCurrentUser = () => currentUser;

  return {
    createAccount,
    getCurrentUser
  };
};
