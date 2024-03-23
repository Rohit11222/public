// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import Plyr from 'plyr';

// Import Auth0 SDK
import { Auth0Client } from 'https://cdn.auth0.com/js/auth0/9.17/auth0.min.js';

// Your web app's Firebase configuration
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

window.onload = async function() {
  // Initialize Auth0 client
  const auth0 = new Auth0Client({
    domain: 'dev-ddeie1zcfk1vp015.us.auth0.com',
    clientId: 'ybnaHQ7VNndMqjDYnp5vKOo7fe3DVfSx'
  });

  const player = new Plyr('#player');

  // Initialize Firebase Storage
  const storage = getStorage(firebaseApp);

  // Get references to DOM elements
  const uploadForm = document.getElementById('uploadForm');
  const videoFileInput = document.getElementById('videoFile');
  const genreDropdown = document.getElementById('genreDropdown');
  const songList = document.getElementById('songList');

  // Function to handle file upload
  if (uploadForm && videoFileInput) {
    uploadForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const file = videoFileInput.files[0];
      if (!file) {
        console.error('No file selected');
        return;
      }

      // Check if user is authenticated with Auth0
      const isAuthenticated = await auth0.isAuthenticated();
      if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        await auth0.loginWithRedirect();
        return;
      }

      // Create a storage reference
      const storageRef = ref(storage, `videos/${file.name}`);

      // Upload the file to Firebase Storage
      const uploadTask = uploadBytes(storageRef, file);

      // Monitor upload progress
      uploadTask.on('state_changed',
        function(snapshot) {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress);
        },
        function(error) {
          // Handle errors
          console.error('Error uploading file:', error);
        },
        function() {
          // Handle successful upload
          console.log('File uploaded successfully');

          // Get the download URL for the uploaded file
          getDownloadURL(uploadTask.snapshot.ref).then(function(downloadURL) {
            // Redirect to the genre.html page with the download URL as a query parameter
            window.location.href = `genre.html?videoUrl=${encodeURIComponent(downloadURL)}`;
          });
        }
      );
    });
  }

  // Function to handle genre selection
  genreDropdown.addEventListener('change', function() {
    const selectedGenre = genreDropdown.value;
    fetchSongsByGenre(selectedGenre);
  });

  // Function to fetch songs by genre from Firebase Storage
  function fetchSongsByGenre(genre) {
    // Reference to the Firebase Storage bucket where your songs are stored
    const storageRef = ref(storage, 'songs');

    // Reference to the Firebase Realtime Database (not needed for this functionality)
    const database = getDatabase(firebaseApp);

    // Path to the folder where songs of the selected genre are stored
    const genreFolderRef = ref(storage, `songs/${genre}`);

    // Fetch the list of songs in the genre folder
    listAll(genreFolderRef)
      .then(function(res) {
        // Extract the download URLs of the songs
        const songs = res.items.map(item => getDownloadURL(item));

        // Once all download URLs are fetched, display the songs
        Promise.all(songs)
          .then(function(downloadURLs) {
            displaySongs(downloadURLs);
          })
          .catch(function(error) {
            console.error('Error fetching songs:', error);
          });
      })
      .catch(function(error) {
        console.error('Error fetching songs:', error);
      });
  }

  // Function to display the list of songs
  function displaySongs(songs) {
    songList.innerHTML = '';

    songs.forEach(songUrl => {
      const songItem = document.createElement('div');
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = songUrl;
      songItem.appendChild(audio);
      songList.appendChild(songItem);
    });
  }

  // Get the video URL from the query parameter and set it as the source for the video player
  const urlParams = new URLSearchParams(window.location.search);
  const videoUrl = urlParams.get('videoUrl');
  if (videoUrl) {
    const videoPlayer = document.getElementById('player');
    videoPlayer.src = decodeURIComponent(videoUrl);
  }
};
