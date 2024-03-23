const express = require('express');
const app = express();

// Import necessary middleware and configuration
const { auth } = require('express-openid-connect');
require('dotenv').config();

// Configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'https://dev-ddeie1zcfk1vp015.us.auth0.com',
  clientID: 'j3MKg4otkGpOZpzQyHg9ThYsxy72QVIx',
  issuerBaseURL: 'https://dev-ddeie1zcfk1vp015.us.auth0.com'
};

// Apply Auth0 middleware
app.use(auth(config));

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to my website');
});

// Route for sign-up page
app.get('/signup', (req, res) => {
  // Render the signup.html page
  res.sendFile(__dirname + '/signup.html');
});

// Route for sign-in page
app.get('/signin', (req, res) => {
  // Render the signin.html page
  res.sendFile(__dirname + '/signin.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
