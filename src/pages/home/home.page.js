import css from '../../style.css';

const template = document.createElement('template');
template.innerHTML = /* html */ `
    <style>
        ${css}
    </style>
    <div class="row">
      <div class="col"> 
        <h1>
          TURN YOUR MIC ON AND SAY THE MUSIC NAME
        </h1>
      </div>
    </div>
`;

export default class HomePage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('home-page', HomePage);
