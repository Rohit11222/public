document.addEventListener("DOMContentLoaded", function() {
    // Initialize Plyr player
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

    // Function to fetch songs by genre using AJAX
    function fetchSongsByGenre(genre) {
        fetch(`/api/songs?genre=${genre}`)
            .then(response => response.json())
            .then(songs => {
                displaySongs(songs);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }

    // Function to display the list of songs
    function displaySongs(songs) {
        const songList = document.getElementById('songList');
        songList.innerHTML = '';

        songs.forEach(song => {
            const songItem = document.createElement('div');
            songItem.textContent = song.name; // Display song name
            songList.appendChild(songItem);

            // Add functionality to play the song on click
            songItem.addEventListener('click', function() {
                playSong(song.url);
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

