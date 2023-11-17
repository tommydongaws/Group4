/*
  Author: jkblair
  Description: Code specific to the overall structure and theme.
*/

"use strict";

// Font name -> class name mapping
const styleMap = {
  "Press Start 2P": "press-start",
  "VT323": "vt323",
  "Orbitron": "orbitron"
};

// Sets the select theme's font for all elements that have the attribute 'data-use-theme-font'
const setFontClass = () => {
  const className = styleMap[document.getElementById('selected-font').innerText];
  const toRemove = Object.values(styleMap).filter(value => value != className);
  const usesTheme = document.querySelectorAll('[data-use-theme-font]');
  for (let elmt of usesTheme) {
    elmt.classList.remove(...toRemove);
    elmt.classList.add(className);
  }
}

const setSelectedFont = (elmt) => {
  document.getElementById('selected-font').innerText = `${elmt.innerText ? elmt.innerText : Object.keys(styleMap)[0]}`;
  setFontClass();
}

const showFonts = () => {
  const fonts = document.querySelectorAll('#font-select > li.hidden');
  for (let item of fonts) {
    item.classList.toggle('hidden');
  }
}

const updateStyles = (path) => {
  // Remove any previously dynamically loaded stylesheet
  const oldStyles = document.querySelector('link[dynamic]');
  if (oldStyles) {
    oldStyles.remove();
  }

  // Create new link element for stylesheet
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = path;
  link.setAttribute('dynamic', '');
  document.head.appendChild(link);
}

const updateScripts = (path) => {
  // Remove any previously dynamically loaded scripts
  const oldScripts = document.querySelector('script[dynamic]');
  if (oldScripts) {
    oldScripts.remove();
  }

  // Create new script elements
  const script = document.createElement('script');
  script.src = path;
  script.setAttribute('dynamic', '');
  document.body.appendChild(script);
}

/*
  Loads pages dynamically without redirection. This is my own take on avoiding iframes,
  however, if someone with access to the HTML files wanted to be malicious, this could
  be a security risk. It loads files from disk, so no risk of dynamic injection
*/
const loadPage = async (elmt) => {
  const validPages = ['index', 'css', 'javascript', 'html'];
  const pageName = elmt === document.body ? 'index' : elmt.getAttribute('data-page');

  if (validPages.includes(pageName)) {
    console.log(`loading ${pageName}`);
    const page = `./pages/${pageName}.html`;
    const stylePath = `./styles/${pageName}.css`;
    const scriptPath = `./scripts/${pageName}.js`;
    const container = document.getElementById('page-container');
    const active_elmt = document.querySelector('#menu ul li.active') || document.querySelector('#nav li');

    try {
      // Fetch the page and add to the page container.
      const response = await fetch(page);
      const data = await response.text();
      container.innerHTML = data;

      updateStyles(stylePath);
      setFontClass();
      updateScripts(scriptPath);

      // Prism highlighting needs to be re-evaluated as well.
      var newOrUpdatedCodes = document.querySelectorAll('pre code');
      newOrUpdatedCodes.forEach(function(code) {
        Prism.highlightElement(code);
      });

      if (elmt !== document.body) {
        active_elmt.classList.remove('active')
        elmt.classList.add('active');
      } else {
        setFontClass();
      }
    } catch (error) {
      console.error('Error loading content:', error);
      container.innerHTML = '<p>Error loading content.</p>';
    }
  }
}

(() => {
  loadPage(document.body);
  //setFontClass(document.body);
})();