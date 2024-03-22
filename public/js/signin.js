// Import the Firebase app instance and auth instance
import { getAuth } from 'firebase/auth';
import firebase from './firebase.js';

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(getAuth(firebase));

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
getAuth(firebase).onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});
