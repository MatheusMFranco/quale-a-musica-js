import LoginPage from './login.page';

describe('LoginTest', () => {
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  test('should attach the shadow root to the page', () => {
    expect(loginPage.shadowRoot).toBeTruthy();
  });

  test('should contain a form', () => {
    const form = loginPage.shadowRoot.querySelector('form');
    expect(form).toBeTruthy();
  });

  test('should contain a login button', () => {
    const button = loginPage.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('should contain a password field', () => {
    const button = loginPage.shadowRoot.querySelector('input[type=password]');
    expect(button).toBeTruthy();
  });

  test('should contain a username field', () => {
    const button = loginPage.shadowRoot.querySelector('#username');
    expect(button).toBeTruthy();
  });

  test('should contain the remember me checkbox', () => {
    const form = loginPage.shadowRoot.querySelector('form');
    const login = form.querySelector('#rememberMe');
    expect(login).toBeTruthy();
  });
});
