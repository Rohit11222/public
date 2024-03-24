// Assign the netlifyIdentity object from the global scope
window.netlifyIdentity = netlifyIdentity;

const userInfoDiv = document.getElementById('userInfo');
const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');

// Initialize the widget with your site's URL
netlifyIdentity.init({
  netlifyUrl: 'https://buzzrafters.netlify.app',
});

// Handle user login
netlifyIdentity.on('login', (user) => {
  userInfoDiv.textContent = `Logged in as ${user.user_metadata.full_name}`;
});

// Handle user logout
netlifyIdentity.on('logout', () => {
  userInfoDiv.textContent = '';
});

// Open the login modal
if (signInButton) {
  signInButton.addEventListener('click', () => {
    netlifyIdentity.open('login');
  });
}

// Open the signup modal
if (signUpButton) {
  signUpButton.addEventListener('click', () => {
    netlifyIdentity.open('signup');
  });
}