const auth0 = new Auth0({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: `${window.location.origin}/callback.html`,
  });
  
  // Handle the authentication callback
  auth0.parseHash({ hash: window.location.hash }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  
    if (result && result.accessToken && result.idToken) {
      // User is authenticated, store the tokens and redirect to the upload page
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('idToken', result.idToken);
      window.location.href = '/upload.html';
    }
  });
  
  // Check if the user is authenticated
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    const idToken = localStorage.getItem('idToken');
    return accessToken && idToken;
  };
  
  // Get the authenticated user's profile
  const getUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const userProfile = await auth0.getUser(accessToken);
      return userProfile;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  // Log out the authenticated user
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    window.location.href = '/'; // Redirect to the index.html
  };