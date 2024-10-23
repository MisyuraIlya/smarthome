const { Model, Recognizer } = require('vosk');
const mic = require('mic');
const fs = require('fs');

// Path to the Russian Vosk model
const MODEL_PATH = 'vosk-model-ru-0.22';
const SAMPLE_RATE = 16000; // Sample rate should be 16kHz

// Ensure the Vosk model exists
if (!fs.existsSync(MODEL_PATH)) {
    console.error('Russian model not found! Download the model and provide the correct path.');
    process.exit();
}

// Initialize the Vosk model
const model = new Model(MODEL_PATH);

// Initialize microphone input stream
const micInstance = mic({
    rate: String(SAMPLE_RATE),
    channels: '1',
    debug: false,
    exitOnSilence: 0 // Disable exit on silence
});

const micInputStream = micInstance.getAudioStream();

// Set up the recognizer
const recognizer = new Recognizer({ model, sampleRate: SAMPLE_RATE });

// Listen for data from the microphone
micInputStream.on('data', (data) => {
    // Feed microphone data to the recognizer
    if (recognizer.acceptWaveform(data)) {
        console.log('Partial result:', recognizer.partialResult());
    }
});

micInputStream.on('end', () => {
    const finalResult = recognizer.finalResult();
    console.log('Final result:', finalResult);
    recognizer.free(); // Free recognizer resources
    model.free(); // Free model resources
});

micInputStream.on('error', (err) => {
    console.error('Error in audio stream:', err);
});

// Start listening indefinitely
micInstance.start();
console.log('Listening for speech...');

// No timeout, the application will run and listen indefinitely
