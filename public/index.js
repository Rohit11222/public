const express = require('express');
const path = require('path');
const { auth } = require('express-openid-connect');
require('dotenv').config(); // Load environment variables

const app = express();

// Configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET, // Fetch secret from environment variables
  baseURL: 'https://dev-ddeie1zcfk1vp015.us.auth0.com',
  clientID: 'j3MKg4otkGpOZpzQyHg9ThYsxy72QVIx', // Replace with your Auth0 client ID
  issuerBaseURL: 'https://dev-ddeie1zcfk1vp015.us.auth0.com'
};

// Apply Auth0 middleware
app.use(auth(config));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

// Route to initiate authentication flow with Auth0
app.get('/auth/signup', (req, res) => {
  // Redirect users to Auth0 signup page
  res.redirect('/login');
});

// Route to handle authentication callback from Auth0
app.get('/auth/callback', (req, res) => {
  // Handle authentication callback from Auth0
  // Validate tokens/user information, create session, etc.
  // Redirect user back to your website
  res.redirect('/');
});

// Start the server
app.listen(() => {
  console.log(`Server is running`);
});
