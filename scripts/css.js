/*
  Author: jkblair
  Description: Script specific to the css.html page.
*/

(() => {
  const btn = document.getElementById('the-button');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('toggled');
      btn.innerText = btn.classList.contains('toggled') ? "I'm depressed 😔" : 'Click me!';
    });
  }
})();