// Access Firebase Auth functionality using the global firebase object
import firebase from "./firebase.js";

const firebaseAuth = firebase.auth();

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
