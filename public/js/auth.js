// Assign the netlifyIdentity object from the global scope
window.netlifyIdentity = netlifyIdentity;

const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');

// Initialize the widget with your site's URL
netlifyIdentity.init({
  netlifyUrl: 'https://buzzrafters.netlify.app',
});

// Handle user login
netlifyIdentity.on('login', () => {
  // Redirect to the upload.html page after successful sign-in
  window.location.href = 'html/upload.html';
});

// Handle user logout
netlifyIdentity.on('logout', () => {
  // Handle logout logic if needed
});

// Open the signup modal
if (signUpButton) {
  signUpButton.addEventListener('click', () => {
    netlifyIdentity.open('signup');
  });
}

// Open the login modal
if (signInButton) {
  signInButton.addEventListener('click', () => {
    netlifyIdentity.open('login');
  });
}