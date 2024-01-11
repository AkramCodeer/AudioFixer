const multer = require('multer');
const { exec } = require('child_process');
const express = require('express');
const router = express.Router();

// Middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for uploading and processing audio
router.post('/process-audio', upload.single('audioFile'), (req, res) => {
  // Check if an audio file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file uploaded.' });
  }

  // Process the audio using fluent-ffmpeg
  const audioBuffer = req.file.buffer;
  const outputFilePath = __dirname + '/../uploads/audio/output.mp3';

  exec(`ffmpeg -i pipe:0 -af afade=d=0.1 -acodec libmp3lame ${outputFilePath}`, { input: audioBuffer }, (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error processing audio.' });
    }

    res.json({ success: true, outputFilePath });
  });
});

module.exports = router;
