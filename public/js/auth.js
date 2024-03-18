// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  firebase.initializeApp(firebaseConfig);
  
  // Function to handle user sign in
  function signIn(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Signed in successfully
              const user = userCredential.user;
              console.log("User signed in:", user.uid);
              // Redirect user to a different page after sign-in if needed
          })
          .catch((error) => {
              // Handle sign-in errors
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Sign-in error:", errorMessage);
          });
  }
  
  // Function to handle user sign up
  function signUp(email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Signed up successfully
              const user = userCredential.user;
              console.log("User signed up:", user.uid);
              // Redirect user to a different page after sign-up if needed
          })
          .catch((error) => {
              // Handle sign-up errors
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Sign-up error:", errorMessage);
          });
  }
  
  // Event listeners for sign-in and sign-up forms
  document.addEventListener("DOMContentLoaded", function() {
      const signInForm = document.getElementById('signInForm');
      const signUpForm = document.getElementById('signUpForm');
  
      if (signInForm) {
          signInForm.addEventListener('submit', function(event) {
              event.preventDefault();
              const email = signInForm.email.value;
              const password = signInForm.password.value;
              signIn(email, password);
          });
      }
  
      if (signUpForm) {
          signUpForm.addEventListener('submit', function(event) {
              event.preventDefault();
              const email = signUpForm.email.value;
              const password = signUpForm.password.value;
              signUp(email, password);
          });
      }
  });
  