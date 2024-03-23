require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET, // Store your secret in environment variables
  baseURL: process.env.BASE_URL || `http://localhost:${port}/callback`, // Adjust base URL
  clientID: process.env.AUTH0_CLIENT_ID, // Your Auth0 client ID
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL // Your Auth0 issuer base URL
};

// Attach authentication routes (/login, /logout, /callback) to the baseURL
app.use(auth(config));

// Define routes
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
