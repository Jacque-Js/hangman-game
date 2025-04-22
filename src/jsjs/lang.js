import { translations } from './langWords.js'

const elementsMap = {
  logo: document.getElementById('logo'),
  startGame: document.getElementById('startGame'),
  darkMode: document.getElementById('darkMode'),
  langMode: document.getElementById('langMode'),
};


export const langTranslate = () => {
    const lang = localStorage.getItem('modeLang');
    const translation = translations[lang] || translations.en;
    
    Object.keys(elementsMap).forEach(key => {
      if (translation[key] && elementsMap[key]) {
        elementsMap[key].textContent = translation[key];
      }
    });
  };

export const langModeHandle = () => {
  const langModelSwitcher = document.getElementById("toggleLanguageMode");
  const htmlElement = document.documentElement;


  if (localStorage.getItem("modeLang") === "ru") {
    htmlElement.lang = "ru";
    langModelSwitcher.checked = true;
  }
  langTranslate()

  langModelSwitcher.addEventListener("input", () => {
    if (htmlElement.lang === "en") {
      htmlElement.lang = "ru";
    } else {
      htmlElement.lang = "en";
    }

    if (htmlElement.lang === "ru") {
      localStorage.setItem("modeLang", "ru");
    } else {
      localStorage.setItem("modeLang", "en");
    }
    langTranslate();
  });
  
};
