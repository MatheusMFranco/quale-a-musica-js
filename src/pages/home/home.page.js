import findVideo from '../../services/youtube.service';
import css from '../../style.css?inline';
import SpeechRecognizer from '../../voice';

const originalHtml = /* html */ `
  <style>
      ${css}
  </style>
  <div class="row">
    <div class="col"> 
      <h1>
        TURN YOUR MIC ON AND SAY THE SONG NAME
      </h1>
    </div>
  </div>
`;

const template = document.createElement('template');
template.innerHTML = originalHtml;

export default class HomePage extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.recognizer = new SpeechRecognizer('pt-BR', this.handleSongTranscription.bind(this));
    this.recognizer.start();
    this.render();
  }

  render() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content);
  }

  async handleSongTranscription(song) {
    await this.createVideoElement(song);
    this.createTryAgainButton();
  }

  restartRecognition() {
    window.location.reload();
  }

  createTryAgainButton() {
    const link = this.shadowRoot.querySelector('a');
    if (!link) {
      const tryAgainLink = document.createElement('a');
      tryAgainLink.classList.add('button', 'outline', 'primary');
      tryAgainLink.textContent = 'Try again';
      tryAgainLink.href = '#';
      tryAgainLink.addEventListener('click', event => {
        event.preventDefault();
        this.restartRecognition();
      });
      this.shadowRoot.appendChild(tryAgainLink);
    }
  }

  async createVideoElement(song) {
    const h1 = this.shadowRoot.querySelector('h1');
    const video = await findVideo(song); 
    if (video) {
      h1.textContent = song;
      const iframeElement = document.createElement('iframe');
      iframeElement.id = 'video-iframe';
      iframeElement.src = video;
      iframeElement.width = '560';
      iframeElement.height = '315';
      iframeElement.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframeElement.allowFullscreen = true;
      this.shadowRoot.appendChild(iframeElement);
    } else {
      h1.textContent = 'Video not found, try again!';
    }
  }
}

customElements.define('home-page', HomePage);
