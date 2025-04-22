import { translations } from './langWords.js'
import { elementsMap } from './domElements.js'



export const langTranslate = () => {
    const lang = localStorage.getItem('modeLang');
    const translation = translations[lang] || translations.en;
    
    Object.keys(elementsMap).forEach(key => {
      if (translation[key] && elementsMap[key]) {
        elementsMap[key].innerHTML = translation[key];
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
