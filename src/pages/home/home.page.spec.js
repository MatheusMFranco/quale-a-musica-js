import {
    vi,
    describe,
    it,
    expect,
    beforeEach,
} from 'vitest';

import HomePage from './home.page';

vi.mock('../../services/youtube/youtube.service');
vi.mock('../../core/voice/voice');

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
      homePage.shadowRoot.innerHTML = '';
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
});
