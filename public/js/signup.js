// Wait for the window to load
window.addEventListener('load', () => {
    // Get the Firebase Authentication instance
    const auth = firebase.auth();
  
    // Get the sign-up form and add a submit event listener
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get the email and password values from the form
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Create a new user with Firebase Authentication
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Sign-up successful
          const user = userCredential.user;
          console.log('Sign-up successful:', user.email);
          // You can optionally redirect the user to another page or perform additional actions
        })
        .catch((error) => {
          // Sign-up failed
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Sign-up failed:', errorMessage);
          // You can display the error message to the user or handle it appropriately
        });
    });
  });