// Wait for the window to load
window.addEventListener('load', () => {
    // Get the Firebase Authentication instance
    const auth = firebase.auth();
  
    // Get the sign-in form and add a submit event listener
    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the email and password values from the form
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Sign in the user with Firebase Authentication
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Sign-in successful
          const user = userCredential.user;
          console.log('Sign-in successful:', user.email);
          // You can optionally redirect the user to another page or perform additional actions
        })
        .catch((error) => {
          // Sign-in failed
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Sign-in failed:', errorMessage);
          // You can display the error message to the user or handle it appropriately
        });
    });
  });