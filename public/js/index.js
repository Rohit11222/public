const express = require('express');
const { auth } = require('express-openid-connect');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Configuration for express-openid-connect middleware
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'https://www.buzzrafters.com',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Adding authentication middleware to Express app
app.use(auth(config));

// Define your application routes
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Start the Express server
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on https://www.buzzrafters.com:${PORT}`);
});
