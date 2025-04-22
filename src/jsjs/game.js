import {
  KEYBOARD_LETTERS,
  WORDS,
  WORDS_RUS,
  KEYBOARD_LETTERS_RUS,
} from "./const";
import { langTranslate } from "./lang";
import { elementsMap } from "./domElements.js";

const stopButton = document.getElementById("toggleLanguageMode");
const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;
let winCount;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");
  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) =>
      acc +
      `<h1 id="letter_${i}" class=" mx-2 text-3xl font-medium mt-5">_</h1>`,
    ""
  );

  // const wordArray = Array.from('_'.repeat(word.length))
  // const placeholdersHTML = wordArray.reduce((acc, curr, i) => acc + `<h1 id="letter_${i}" class=" mx-2 text-3xl font-medium">${curr}</h1>`,'')
  // console.log(placeholdersHTML)

  // let placeholdersHTML = ''
  // for (let i = 0; i < word.length; i++) {
  //     placeholdersHTML = placeholdersHTML + `<h1 id="letter_${i}" class=" mx-2 text-3xl font-medium">_</h1>`
  // }
  return `<div id="placeholders" class="flex flex-row">${placeholdersHTML}</div>`;
};

const getCurrentLang = () => localStorage.getItem("modeLang") || "en";

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add(
    "max-w-2xl",
    "mt-5",
    "flex",
    "justify-center",
    "flex-wrap"
  );
  keyboard.id = "keyboard";

  const letters =
    getCurrentLang() === "ru" ? KEYBOARD_LETTERS_RUS : KEYBOARD_LETTERS;

  const keyboardHTML = letters.reduce((acc, curr) => {
    return (
      acc +
      `<button class="flex justify-center items-center w-8 h-8 sm:w-14 sm:h-14 m-0.5 sm:m-2 bg-slate-200 dark:bg-indigo-500 enabled:dark:hover:bg-indigo-600 enabled:hover:bg-slate-300 rounded-md font-medium px-5 py-2 disabled:opacity-50" id="${curr}">${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("w-32", "h-32", "sm:w-60", "sm:h-60");
  image.id = "hangman-img";

  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();
  // буквы нет в слове
  if (!word.includes(inputLetter)) {
    const triesCouter = document.getElementById("tries-left");
    triesLeft -= 1;
    triesCouter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    // буква есть
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
        if (winCount === word.length) {
          stopGame("win");
        }
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-img").src = `images/hg-win.png`;
    document.getElementById(
      "game"
    ).innerHTML += `<h2 class="text-2xl font-bold text-lime-600 mt-4">You won!</h2>`;
  } else if (status === "lose") {
    document.getElementById(
      "game"
    ).innerHTML += `<h2 class="text-2xl font-bold text-red-600 mt-4">You lost : </h2>`;
  } else if (status === "quit") {
    logoH1.classList.remove("text-xl", "sm:text-xl", "md:text-xl", "mt-25");
    document.getElementById("hangman-img").remove();
  }

  stopButton.disabled = false;
  logoH1.classList.remove("mt-20");

  document.getElementById(
    "game"
  ).innerHTML += `<p>The word was: <span class="font-medium uppercase">${word}</span></p><button id="play-again" class="flex justify-center items-center bg-slate-200 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:bg-slate-300 rounded-md font-medium px-5 py-2 mt-5">Play Again</button>`;
  elementsMap.playAgain = document.getElementById("play-again");

  document.getElementById("play-again").onclick = startGame;
  langTranslate();
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add("text-xl", "sm:text-xl", "md:text-xl", "mt-20");
  const langSecret = getCurrentLang();
  const wordList = langSecret === "ru" ? WORDS_RUS : WORDS;
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const wordToGuess = wordList[randomIndex];
  sessionStorage.setItem("word", wordToGuess); //сохраняет данные по парам(ключ-значение) + постоянное значение

  stopButton.disabled = true;

  gameDiv.innerHTML = createPlaceholdersHTML();
  gameDiv.innerHTML += `
  <p id="tries" class="mt-5">
    <span id="tries-text">TRIES LEFT: </span>
    <span id="tries-left" class="font-medium text-red-600">10</span>
  </p>
`;
  elementsMap.triesLeft = document.getElementById("tries-text");

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg); // добавление в начало

  gameDiv.appendChild(keyboardDiv); //добавление в конец
  // gameDiv.innerHTML += createKeyboard()

  const createQuitButton = () => {
    const quitButton = document.createElement("button");
    quitButton.id = "quit";
    quitButton.className =
      "border border-black rounded-md hover:bg-slate-100 dark:border-white dark:hover:bg-zinc-600 px-4 py-1 mt-4";

    elementsMap.quit = quitButton;

    quitButton.onclick = () => {
      const lang = localStorage.getItem("modeLang");
      const isSure = confirm(
        lang === "ru"
          ? "Уверены, что хотите выйти и потерять прогресс?"
          : "Are you sure you want to quit and lose progress?"
      );
      if (isSure) {
        stopGame("quit");
      }
    };
    return quitButton;
  };

  elementsMap.quit = document.getElementById("quit");
  elementsMap.playAgain = document.getElementById("play-again");
  elementsMap.triesLeft = document.getElementById("tries-text");
  gameDiv.appendChild(createQuitButton());
  langTranslate();
};
