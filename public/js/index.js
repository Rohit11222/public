// index.js

// Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Define an endpoint to fetch songs by genre
app.get('/api/songs', (req, res) => {
    const genre = req.query.genre; // Get genre from query parameter

    // Read files from the corresponding genre folder
    const genreFolderPath = path.join(__dirname, 'media', 'songs', genre);
    fs.readdir(genreFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading genre folder:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the list of song files to the client
        const songs = files.map(file => ({
            title: file, // Assuming the file name is the song title
            url: `/media/songs/${genre}/${file}` // Construct URL to access the song file
        }));

        res.json(songs);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
