import css from './login.style';

const template = document.createElement('template');
template.innerHTML = /* html */ `
    <style>
        ${css}
    </style>
    <div class="wrapper">
        <form class="form-signin">
            <h2 class="form-signin-heading" id="login-header">Please login</h2>
            <label for="username" class="sr-only">Email Address</label>
            <input type="text" id="username" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" name="password" placeholder="Password" required=""/>
            <div class="form-group">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label for="rememberMe">Remember me</label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="button">Login</button>
        </form>
    </div>
`;

export default class LoginPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('login-page', LoginPage);
