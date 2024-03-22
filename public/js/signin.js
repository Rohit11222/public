// Import the required Firebase modules
import firebase from 'https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js';
import * as firebaseui from 'https://cdn.firebase.com/libs/firebaseui/4.8.0/firebaseui.js';
import 'https://cdn.firebase.com/libs/firebaseui/4.8.0/firebaseui.css';

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
  // Other config options...
};

const signInElement = document.getElementById('sign-in-element');
ui.start(signInElement, uiConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});