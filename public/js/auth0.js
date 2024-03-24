const userInfoDiv = document.getElementById('userInfo');
const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init({
  netlifyUrl: 'https://www.buzzrafters.com',
});

netlifyIdentity.on('login', (user) => {
  userInfoDiv.textContent = `Logged in as ${user.user_metadata.full_name}`;
});

netlifyIdentity.on('logout', () => {
  userInfoDiv.textContent = '';
});

if (signInButton) {
  signInButton.addEventListener('click', () => {
    netlifyIdentity.open('login');
  });
}

if (signUpButton) {
  signUpButton.addEventListener('click', () => {
    netlifyIdentity.open('signup');
  });
}