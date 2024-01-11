const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const audioController = require('./src/controllers/audioController');

app.use('/api', audioController); // Assume your routes are prefixed with '/api'

const app = express();
const port = 3000;

// Middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/process-audio', upload.single('audioFile'), (req, res) => {
  // Check if an audio file was uploaded
  if (!req.file) {
    return res.status(400).send('No audio file uploaded.');
  }

  // Process the audio using fluent-ffmpeg
  const audioBuffer = req.file.buffer;
  const outputFilePath = __dirname + '/uploads/audio/output.mp3';

  exec(`ffmpeg -i pipe:0 -af afade=d=0.1 -acodec libmp3lame ${outputFilePath}`, { input: audioBuffer }, (error) => {
    if (error) {
      return res.status(500).send('Error processing audio.');
    }

    res.sendFile(outputFilePath);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
