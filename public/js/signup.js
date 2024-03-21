import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiqVDUshhfusWn5Z2b-4p2KVpsyLSNleI",
  authDomain: "buzzrafters-a3e2b.firebaseapp.com",
  databaseURL: "https://buzzrafters-a3e2b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "buzzrafters-a3e2b",
  storageBucket: "buzzrafters-a3e2b.appspot.com",
  messagingSenderId: "970830986248",
  appId: "1:970830986248:web:5d311e15c3031759a5e5bd",
  measurementId: "G-4W0PT6G2D4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // Other providers...
  ],
  signInSuccessUrl: '/path/to/your/success/page.html', // URL to redirect to after successful sign-in
  signInFlow: 'popup', // Use the popup mode for sign-in flow
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

const signUpElement = document.getElementById('sign-up-element');
ui.start(signUpElement, uiConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});