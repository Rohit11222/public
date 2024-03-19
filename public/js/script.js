document.addEventListener("DOMContentLoaded", function() {
    const player = new Plyr('#player');

    // Initialize Firebase Storage
    const storage = firebase.storage();

    // Get references to DOM elements
    const uploadForm = document.getElementById('uploadForm');
    const videoFileInput = document.getElementById('videoFile');

    // Function to handle file upload
    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const file = videoFileInput.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        // Create a storage reference
        const storageRef = storage.ref(`videos/${file.name}`);

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.put(file);

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
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    // Redirect to the genre.html page with the download URL as a query parameter
                    window.location.href = `genre.html?videoUrl=${encodeURIComponent(downloadURL)}`;
                });
            }
        );
    });

    // Function to handle genre selection
    const genreDropdown = document.getElementById('genreDropdown');
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
        const songList = document.getElementById('songList');
        songList.innerHTML = '';

        songs.forEach(songUrl => {
            const songItem = document.createElement('div');
            songItem.textContent = songUrl; // Display song URL for now
            songList.appendChild(songItem);

            // Add functionality to play the song on click
            songItem.addEventListener('click', function() {
                playSong(songUrl);
            });
        });
    }

    // Function to play the selected song
    function playSong(songUrl) {
        // Set the source of the Plyr player to the selected song URL
        player.source = {
            type: 'video',
            sources: [{
                src: songUrl,
                type: 'video/mp4',
            }],
        };
    }
});
