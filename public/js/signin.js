// Import Firebase app instance and auth instance
import { firebaseApp, firebaseAuth } from './firebase.js';

// Import FirebaseUI
const firebaseui = require('firebaseui');

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebaseAuth);

// FirebaseUI configuration
const uiConfig = {
  signInOptions: [
    firebaseAuth.EmailAuthProvider.PROVIDER_ID,
    // Other providers...
  ],
  // Other config options...
};

// Get the sign-in or sign-up element
const signInElement = document.getElementById('sign-in-element');
const signUpElement = document.getElementById('sign-up-element');

// Start FirebaseUI
ui.start(signInElement || signUpElement, uiConfig);

// Listen for auth state changes
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});
