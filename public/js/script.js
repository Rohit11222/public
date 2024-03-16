document.addEventListener("DOMContentLoaded", function() {
    const player = new Plyr('#player');

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
