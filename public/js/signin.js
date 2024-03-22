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

// FirebaseUI configuration
const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID, // Email/Password
    firebase.auth.GoogleAuthProvider.PROVIDER_ID // Google
  ],
  signInSuccessUrl: '/upload.html', // Redirect URL after sign-up
  signInFlow: 'popup', // Display sign-up flow as a popup
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // Handle successful sign-up
      // Redirect to the specified URL
      window.location.assign(redirectUrl);
      return false; // Prevent automatic redirect
    }
  }
};

// Initialize the FirebaseUI instance
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Start the FirebaseUI authentication UI
ui.start('#sign-up-element', uiConfig);

// Listen to authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});
