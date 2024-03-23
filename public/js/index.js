const express = require('express');
const { auth } = require('express-openid-connect');
const path = require('path');

const app = express();

// Config for express-openid-connect middleware
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'DQIhG4hQ0qwCXZGIhl1kQhtRB8Z42tJCEyuu4wp0wrdCXncb2CrfiIMfOmR4OIyn',
  baseURL: 'https://www.buzzrafters.com',
  clientID: 'j3MKg4otkGpOZpzQyHg9ThYsxy72QVIx',
  issuerBaseURL: 'https://dev-ddeie1zcfk1vp015.us.auth0.com'
};

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Route for signin.html
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

// Route for signup.html
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route for checking authentication status
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));