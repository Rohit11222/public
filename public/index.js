const express = require('express');
const { auth } = require('express-openid-connect');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

// Config for express-openid-connect middleware
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'https://www.buzzrafters.com', // Your custom domain
  clientID: 'j3MKg4otkGpOZpzQyHg9ThYsxy72QVIx',
  issuerBaseURL: 'https://dev-ddeie1zcfk1vp015.us.auth0.com'
};

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Route for handling the authentication callback
app.get('/callback', (req, res) => {
  // Handle the authentication callback
  // Redirect the user to the upload.html page after successful authentication
  res.redirect('/upload.html');
});

// Serve the static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for client-side routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export the Express app as a Lambda function
exports.handler = serverless(app);