import HomePage from './pages/home/home.page';

if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}

const home = new HomePage();
document.querySelector('#app').appendChild(home);
