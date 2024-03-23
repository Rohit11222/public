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

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static('public'));

// Define your application routes
// Route to serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Route to serve the signin page
app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

// Route to handle form submission for signup
app.post('/signup', (req, res) => {
  // Handle form submission for signup
  // For example, process form data and create a new user account
  res.send('Signup successful');
});

// Route to handle form submission for signin
app.post('/signin', (req, res) => {
  // Handle form submission for signin
  // For example, validate credentials and authenticate the user
  res.send('Signin successful');
});

// Start the Express server
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on https://www.buzzrafters.com:${PORT}`);
});
