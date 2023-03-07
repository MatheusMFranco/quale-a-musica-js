export default class Login {
  constructor(page) {
    page.addEventListener('submit', this.onSubmit.bind(this));
  }
}
