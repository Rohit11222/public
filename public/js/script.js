document.addEventListener("DOMContentLoaded", function() {
    const player = new Plyr('#player');

    // Function to handle genre selection
    const genreDropdown = document.getElementById('genreDropdown');
    genreDropdown.addEventListener('change', function() {
        const selectedGenre = genreDropdown.value;
        fetchSongsByGenre(selectedGenre);
    });

    // Function to fetch songs by genre
    function fetchSongsByGenre(genre) {
        // Clear previous songs
        const songList = document.getElementById('songList');
        songList.innerHTML = '';

        // Simulated data for songs (replace this with your actual data)
        const mockSongs = [
            { name: 'Song 1', url: 'https://example.com/song1.mp4' },
            { name: 'Song 2', url: 'https://example.com/song2.mp4' },
            { name: 'Song 3', url: 'https://example.com/song3.mp4' }
            // Add more songs as needed
        ];

        // Create HTML elements for each song and append them to the song list
        mockSongs.forEach(song => {
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

    // Redirect user to upload.html after signing up or signing in
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = 'upload.html';
    });

    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = 'upload.html';
    });
});
