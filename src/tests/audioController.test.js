// audio.controller.js
import AudioProcessor from 'path/to/AudioProcessor'; // Update the path based on your project structure

class AudioController {
  constructor() {
    this.audioProcessor = new AudioProcessor();
    this.setupUI();
  }

  setupUI() {
    document.getElementById('uploadBtn').addEventListener('change', this.handleFileUpload.bind(this));
    document.getElementById('processBtn').addEventListener('click', this.handleProcessButtonClick.bind(this));
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.audioProcessor.loadAudioFile(file)
        .then(() => {
          console.log('Audio file loaded successfully');
        })
        .catch((error) => {
          console.error('Error loading audio file:', error.message);
        });
    }
  }

  handleProcessButtonClick() {
    this.audioProcessor.removeFillerWords();
  }
}

export default AudioController;
