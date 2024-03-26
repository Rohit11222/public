// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';

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

// Initialize the Plyr video player
const player = new Plyr('#player');

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

// Get references to DOM elements
const dropdown = document.getElementById('dropdown');
const songList = document.getElementById('songList');

// Function to handle genre selection
dropdown.addEventListener('change', function () {
  const selectedGenre = dropdown.value;
  fetchSongsByGenre(selectedGenre);
});

// Function to fetch songs by genre from Firebase Storage
function fetchSongsByGenre(genre) {
  // Reference to the Firebase Storage bucket where your songs are stored
  const storageRef = ref(storage, 'songs');

  // Path to the folder where songs of the selected genre are stored
  const genreFolderRef = ref(storage, `songs/${genre}`);

  // Fetch the list of songs in the genre folder
  listAll(genreFolderRef)
    .then(function (res) {
      // Extract the download URLs of the songs
      const songs = res.items.map((item) => getDownloadURL(item));

      // Once all download URLs are fetched, display the songs
      Promise.all(songs)
        .then(function (downloadURLs) {
          displaySongs(downloadURLs);
        })
        .catch(function (error) {
          console.error('Error fetching songs:', error);
        });
    })
    .catch(function (error) {
      console.error('Error fetching songs:', error);
    });
}

// Function to display the list of songs
function displaySongs(songs) {
  songList.innerHTML = '';
  songs.forEach((songUrl) => {
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