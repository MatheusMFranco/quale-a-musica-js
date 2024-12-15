export default class SpeechRecognizer {
    constructor(lang = 'pt-BR', callback) {
        this.lang = lang;
        this.callback = callback;

        window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
        if (!window.SpeechRecognition) {
        throw new Error('SpeechRecognition não é suportado no seu navegador.');
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = this.lang;
    }

    start() {
        this.recognition.start();
        this.recognition.addEventListener('result', this.onSpeak.bind(this));
    }

    stop() {
        this.recognition.stop();
    }

    onSpeak(event) {
        const transcript = event.results[0][0].transcript;
        if (typeof this.callback === 'function') {
        this.callback(transcript);
        }
    }
}
