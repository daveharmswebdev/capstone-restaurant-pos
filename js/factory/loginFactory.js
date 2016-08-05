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
      currentUser = {};
    }
  });

  let createAccount = function(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  let getCurrentUser = () => currentUser;

  let loginEmail = function(email, password) {
    console.log('loginEmail');
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  let logoutUser = function() {
    console.log('logout user');
    return firebase.auth().signOut();
  };

  return {
    createAccount,
    getCurrentUser,
    loginEmail,
    logoutUser
  };
};
