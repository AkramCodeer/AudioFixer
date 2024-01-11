// js/app.js
import AudioProcessor from './audio.service.js';

const audioProcessor = new AudioProcessor();

// Assume there is an input element with id="audioFileInput" in your HTML
const fileInput = document.getElementById('audioFileInput');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];

  try {
    await audioProcessor.loadAudioFile(file);
    audioProcessor.removeFillerWords();
  } catch (error) {
    console.error('Error loading audio file:', error.message);
  }
});

// Assume there is a button with id="exportButton" in your HTML
const exportButton = document.getElementById('exportButton');

exportButton.addEventListener('click', () => {
  audioProcessor.exportProcessedAudio();
});


document.addEventListener('DOMContentLoaded', () => {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
      height: 100,
    });
  
    const audioFileInput = document.getElementById('audioFile');
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const response = await fetch('/process-audio', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const audioUrl = URL.createObjectURL(await response.blob());
        wavesurfer.load(audioUrl);
      } else {
        console.error('Error processing audio.');
      }
    });
  
    audioFileInput.addEventListener('change', () => {
      wavesurfer.empty();
    });
  });
  