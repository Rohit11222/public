// Supabase initialization
const supabaseUrl = 'https://laufbfkshegoiwlzebxb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdWZiZmtzaGVnb2l3bHplYnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NDM0OTcsImV4cCI6MjAyNjUxOTQ5N30.oUSU5-OVIoTIOP1FgNHAUHlErGfbe6X_Joz9ipWGrT0'; // Replace 'public-anon-key' with your actual Supabase public key
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch songs by genre from Supabase
async function fetchSongsByGenre(genre) {
    const { data, error } = await supabase
        .from('songs')
        .select('audio_url')
        .eq('genre', genre);

    if (error) {
        console.error('Error fetching songs:', error.message);
        return [];
    }

    return data.map(song => song.audio_url);
}

window.onload = async function() {
    // Get references to DOM elements
    const dropdown = document.getElementById('dropdown');
    const songContainer = document.getElementById('songContainer');
    const videoPlayer = document.getElementById('player');

    // Function to display songs
    const displaySongs = (songs) => {
        songContainer.innerHTML = '';
        songs.forEach(songUrl => {
            const songElement = document.createElement('div');
            const audio = document.createElement('audio');
            audio.src = songUrl;
            audio.controls = true;
            songElement.appendChild(audio);
            songContainer.appendChild(songElement);
        });
    };

    // Event listener for genre selection
    dropdown.addEventListener('change', async () => {
        const selectedGenre = dropdown.value;
        const songs = await fetchSongsByGenre(selectedGenre);
        displaySongs(songs);
    });

    // Get the video URL from the query parameter and set it as the source for the video player
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('videoUrl');
    if (videoUrl && videoPlayer) {
        videoPlayer.src = decodeURIComponent(videoUrl);
        // Create a new instance of Plyr after setting the video source
        const player = new Plyr(videoPlayer);
    }

    // Fetch and display songs for the initial genre
    const initialGenre = dropdown.value;
    const songs = await fetchSongsByGenre(initialGenre);
    displaySongs(songs);
};
