import css from '../../style.css';
import SpeechRecognizer from '../../voice';

const DEFAULT_TITLE = 'TURN YOUR MIC ON AND SAY THE SONG NAME';
const template = document.createElement('template');
template.innerHTML = /* html */ `
    <style>
        ${css}
    </style>
    <div class="row">
      <div class="col"> 
        <h1>
          ${DEFAULT_TITLE}
        </h1>
      </div>
    </div>
`;

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
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  handleSongTranscription(song) {
    const h1 = this.shadowRoot.querySelector('h1');
    const link = this.shadowRoot.querySelector('a');

    if (h1) {
      h1.textContent = song;
    }

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

  restartRecognition() {
    this.recognizer.start();
    const h1 = this.shadowRoot.querySelector('h1');
    const link = this.shadowRoot.querySelector('a');
    if (h1) {
      h1.textContent = DEFAULT_TITLE;
    }
    if (link) { 
      link.remove();
    }
  }
}

customElements.define('home-page', HomePage);
