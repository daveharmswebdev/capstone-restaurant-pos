'use strict';

module.exports = function(firebaseFactory, $timeout) {
  let firebase = firebaseFactory.fbInstance;
  let currentUser = {};

  // listens for firebase user change
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      currentUser.uid = user.uid;
      currentUser.email = user.email;
      console.log(currentUser);
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
