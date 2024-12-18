import {
    vi,
    describe,
    it,
    expect,
    beforeEach,
} from 'vitest';

import SpeechRecognizer from './voice';

describe('SpeechRecognizer', () => {
  let speechRecognizer;
  let mockCallback;

  beforeEach(() => {
    mockCallback = vi.fn();
    globalThis.webkitSpeechRecognition = vi.fn().mockImplementation(() => {
      return {
        lang: 'pt-BR',
        start: vi.fn(),
        stop: vi.fn(),
        addEventListener: vi.fn((event, callback) => {
          if (event === 'result') {
            this.onresult = callback; // Configura o callback do evento 'result'
          }
        }),
      };
    });

    speechRecognizer = new SpeechRecognizer('pt-BR', mockCallback);
  });

  it('should initialize with correct language and callback', () => {
    expect(speechRecognizer.lang).toBe('pt-BR');
    expect(speechRecognizer.callback).toBe(mockCallback);
  });

  it('should call start() and initialize SpeechRecognition', () => {
    const recognitionSpy = vi.spyOn(speechRecognizer.recognition, 'start');
    speechRecognizer.start();

    expect(recognitionSpy).toHaveBeenCalled();
    expect(speechRecognizer.recognition.addEventListener).toHaveBeenCalledWith('result', expect.any(Function));
  });

  it('should call stop() and stop the recognition', () => {
    const stopSpy = vi.spyOn(speechRecognizer.recognition, 'stop');
    speechRecognizer.stop();

    expect(stopSpy).toHaveBeenCalled();
  });

  it('should trigger the callback with the transcript when "result" event occurs', () => {
    const mockEvent = {
      results: [
        [
          { transcript: 'Hello World' },
        ],
      ],
    };

    speechRecognizer.onSpeak(mockEvent);

    expect(mockCallback).toHaveBeenCalledWith('Hello World');
  });
});
