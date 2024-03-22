// Import the Firebase app instance and auth instance
import { firebaseApp, firebaseAuth } from './firebase.js';

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebaseAuth);

// FirebaseUI configuration
const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // Other providers...
  ],
  // Other config options...
};

// Get the sign-in element
const signInElement = document.getElementById('sign-in-element');

// Start FirebaseUI
ui.start(signInElement, uiConfig);

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