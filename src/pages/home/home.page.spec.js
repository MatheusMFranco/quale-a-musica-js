import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import HomePage from './home.page';
import { originalHtml } from '../../constants';

vi.mock('axios');
vi.mock('../../services/youtube/youtube.service');
vi.mock('../../core/voice/voice');

axios.get = vi.fn();

globalThis.webkitSpeechRecognition = vi.fn().mockImplementation(() => {
  return {
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
    onresult: null,
    onerror: null,
    onstart: null,
    onend: null,
    addEventListener: vi.fn((event, callback) => {
      if (event === 'result') {
        this.onresult = callback;
      }
      if (event === 'error') {
        this.onerror = callback;
      }
      if (event === 'start') {
        this.onstart = callback;
      }
      if (event === 'end') {
        this.onend = callback;
      }
    })
  };
});

describe('HomePage', () => {
  let homePage;

  beforeEach(() => {
    if (homePage && homePage.shadowRoot) {
      homePage.shadowRoot.innerHTML = originalHtml;
    }
    homePage = new HomePage();
    document.body.appendChild(homePage);
  });

  it('should render the home page with a title and initial content', () => {
    const shadowRoot = homePage.shadowRoot;
    const h1 = shadowRoot.querySelector('h1');
    
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('TURN YOUR MIC ON AND SAY THE SONG NAME');
  });

  it('should reload the page when "Try again" button is clicked', async () => {
    const reloadSpy = vi.spyOn(homePage, 'restartRecognition');
    
    homePage.createTryAgainButton();
    
    const tryAgainButton = homePage.shadowRoot.querySelector('a');
    tryAgainButton.click();

    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should call createVideoElement and createTryAgainButton', async () => {
    const createVideoElementSpy = vi.spyOn(homePage, 'createVideoElement').mockResolvedValue();
    const createTryAgainButtonSpy = vi.spyOn(homePage, 'createTryAgainButton').mockImplementation(() => {});
    const song = 'Song';
    await homePage.handleSongTranscription(song);
    expect(createVideoElementSpy).toHaveBeenCalledWith(song);
    expect(createTryAgainButtonSpy).toHaveBeenCalled();
  });

  it('should create video element when video is found', async () => {
    const song = 'My Song';

    const h1Mock = { textContent: '' };
    homePage.shadowRoot.querySelector = vi.fn().mockReturnValue(h1Mock);
    
    vi.mock('../../services/youtube/youtube.service', () => ({
      default: vi.fn().mockReturnValue('https://www.youtube.com/embed/videoId123'),
    }));
    await homePage.createVideoElement(song);
    expect(h1Mock.textContent).toBe(song);
  });

  it('should create video element when video is found', async () => {
    const h1Mock = { textContent: 'Video not found, try again!' };
    homePage.shadowRoot.querySelector = vi.fn().mockReturnValue(h1Mock);
    await homePage.createVideoElement(null);
    const h1 = homePage.shadowRoot.querySelector('h1');
    expect(h1.textContent).toBe('Video not found, try again!');
  });

});
