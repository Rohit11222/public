import firebase from 'firebase/app';
import 'firebase/storage';
import netlifyIdentity from 'netlify-identity-widget';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiqVDUshhfusWn5Z2b-4p2KVpsyLSNleI",
    authDomain: "buzzrafters-a3e2b.firebaseapp.com",
    databaseURL: "https://buzzrafters-a3e2b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "buzzrafters-a3e2b",
    storageBucket: "buzzrafters-a3e2b.appspot.com",
    messagingSenderId: "970830986248",
    appId: "1:970830986248:web:5d311e15c3031759a5e5bd",
    measurementId: "G-4W0PT6G2D4"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Storage service
const storage = firebase.storage();

// Add event listener to the upload form
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const videoFile = document.getElementById('videoFile').files[0];

  if (videoFile) {
    try {
      // Authenticate the user with Netlify Identity
      netlifyIdentity.open();

      // Get the user's authentication token after successful authentication
      const user = await netlifyIdentity.currentUser();
      const userToken = user.jwt;

      // Create a reference to the file in Firebase Storage
      const fileRef = storage.ref(`videos/${videoFile.name}`);

      // Upload the file with the user's authentication token
      const uploadTask = await fileRef.put(videoFile, { customMetadata: { jwt: userToken } });

      // Get the download URL of the uploaded file
      const downloadURL = await uploadTask.ref.getDownloadURL();
      console.log('Video uploaded successfully:', downloadURL);

      // Redirect to genre.html with download URL as query parameter
      window.location.href = `genre.html?videoUrl=${encodeURIComponent(downloadURL)}`;
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  }
});