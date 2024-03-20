// Import Supabase client
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = 'https://laufbfkshegoiwlzebxb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdWZiZmtzaGVnb2l3bHplYnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NDM0OTcsImV4cCI6MjAyNjUxOTQ5N30.oUSU5-OVIoTIOP1FgNHAUHlErGfbe6X_Joz9ipWGrT0'
const supabase = createClient(supabaseUrl, supabaseKey)

// Your web app's Firebase configuration
const firebaseConfig = {
  // Your Firebase configuration object
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

document.addEventListener("DOMContentLoaded", function() {
  const player = new Plyr('#player')

  // Initialize Firebase Storage
  const storage = firebase.storage()

  // Get references to DOM elements
  const genreDropdown = document.getElementById('genreDropdown')
  const songList = document.getElementById('songList')

  // Function to handle genre selection
  genreDropdown.addEventListener('change', function() {
    const selectedGenre = genreDropdown.value
    fetchSongsByGenre(selectedGenre)
  })

  // Function to fetch songs by genre from Supabase Storage
  async function fetchSongsByGenre(genre) {
    try {
      const { data, error } = await supabase
        .storage
        .from('songs')
        .list(`${genre}/`, {
          limit: 100,
          sortBy: { column: 'name', order: 'asc' },
        })

      if (error) {
        console.error('Error fetching songs:', error)
      } else {
        const songs = data.map(file => supabase.storage.from('songs').getPublicUrl(`${genre}/${file.name}`).data.publicUrl)
        displaySongs(songs)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  // Function to display the list of songs
  function displaySongs(songs) {
    songList.innerHTML = ''

    songs.forEach(songUrl => {
      const songItem = document.createElement('div')
      const audio = document.createElement('audio')
      audio.controls = true
      audio.src = songUrl
      songItem.appendChild(audio)
      songList.appendChild(songItem)
    })
  }

  // Get the video URL from the query parameter and set it as the source for the video player
  const urlParams = new URLSearchParams(window.location.search)
  const videoUrl = urlParams.get('videoUrl')
  if (videoUrl) {
    const videoPlayer = document.getElementById('player')
    videoPlayer.src = decodeURIComponent(videoUrl)
  }
})