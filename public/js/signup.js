// Import the Firebase app instance and auth instance
import { firebaseApp, firebaseAuth } from '../js/firebase.js';

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebaseAuth);

// FirebaseUI configuration
const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // Other providers...
  ],
  signInSuccessUrl: '/path/to/your/success/page.html',
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // Handle successful sign-in
      if (authResult.additionalUserInfo.isNewUser) {
        // New user signed up
        console.log('New user signed up:', authResult.user);
      } else {
        // Existing user signed in
        console.log('Existing user signed in:', authResult.user);
      }
      // Optionally, you can redirect the user to a different page
      // window.location.assign(redirectUrl);
      return false; // Prevent automatic redirect
    }
  }
};

// Get the sign-up element
const signUpElement = document.getElementById('sign-up-element');

// Start FirebaseUI
ui.start(signUpElement, uiConfig);

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