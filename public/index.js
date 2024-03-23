// Import necessary modules
const express = require('express');
const path = require('path'); // For working with file paths
const { auth } = require('express-openid-connect');
require('dotenv').config(); // For loading environment variables

// Create Express application
const app = express();

// Configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET, // Fetch secret from environment variables
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
  // Serve the signup.html page from the public/html directory
  res.sendFile(path.join(__dirname, 'public', 'html', 'signup.html'));
});

// Route for sign-in page
app.get('/signin', (req, res) => {
  // Serve the signin.html page from the public/html directory
  res.sendFile(path.join(__dirname, 'public', 'html', 'signin.html'));
});

// Start the server
// No need to specify port, Netlify will manage this
app.listen(() => {
  console.log(`Server is running`);
});
