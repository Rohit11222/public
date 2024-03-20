// Create a script element for the Firebase SDK
const firebaseScript = document.createElement('script');
firebaseScript.src = 'https://cdn.jsdelivr.net/npm/firebase@9.6.0/firebase.js'; // Updated URL with jsDelivr CDN
document.head.appendChild(firebaseScript);

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

// Wait for the Firebase SDK to load
firebaseScript.addEventListener('load', () => {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Your existing code starts here
  const player = new Plyr('#player');

  // Initialize Firebase Storage
  const storage = firebase.storage();

  // Get references to DOM elements
  const genreDropdown = document.getElementById('genreDropdown');
  const songList = document.getElementById('songList');

  // Function to handle genre selection
  genreDropdown.addEventListener('change', function() {
    const selectedGenre = genreDropdown.value;
    fetchSongsByGenre(selectedGenre);
  });

  // Function to fetch songs by genre from Firebase Storage
  function fetchSongsByGenre(genre) {
    // Reference to the Firebase Storage bucket where your songs are stored
    const storageRef = storage.ref();

    // Path to the folder where songs of the selected genre are stored
    const genreFolderRef = storageRef.child(`songs/${genre}`);

    // Fetch the list of songs in the genre folder
    genreFolderRef.listAll().then(function(res) {
      // Extract the download URLs of the songs
      const songs = res.items.map(item => item.getDownloadURL());

      // Once all download URLs are fetched, display the songs
      Promise.all(songs).then(function(downloadURLs) {
        displaySongs(downloadURLs);
      }).catch(function(error) {
        console.error('Error fetching songs:', error);
      });
    }).catch(function(error) {
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
});
