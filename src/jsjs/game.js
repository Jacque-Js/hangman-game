import { KEYBOARD_LETTERS, WORDS } from "./const";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;
let winCount;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");

  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) =>
      acc + `<h1 id="letter_${i}" class=" mx-2 text-3xl font-medium mt-5">_</h1>`,
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

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="flex justify-center items-center w-10 h-10 sm:w-14 sm:h-14 m-1 sm:m-2 bg-slate-200 dark:bg-indigo-500 enabled:dark:hover:bg-indigo-600 enabled:hover:bg-slate-300 rounded-md font-medium px-5 py-2 disabled:opacity-50" id="${curr}">${curr}</button>`
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
    logoH1.classList.remove("text-xl", "sm:text-xl", "md:text-xl");
    document.getElementById("hangman-img").remove();
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>The word was: <span class="font-medium uppercase">${word}</span></p><button id="play-again" class="flex justify-center items-center bg-slate-200 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:bg-slate-300 rounded-md font-medium px-5 py-2 mt-5">Play Again</button>`;
  document.getElementById("play-again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add("text-xl", "sm:text-xl", "md:text-xl");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess); //сохраняет данные по парам(ключ-значение) + постоянное значение

  gameDiv.innerHTML = createPlaceholdersHTML();
  gameDiv.innerHTML += `<p id="tries" class="mt-5">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);
  // gameDiv.innerHTML += createKeyboard()

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="border border-black rounded-md hover:bg-slate-100 dark:border-white dark:hover:bg-zinc-600 px-4 py-1 mt-4">Quit</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm("Уверены, что хотите выйти и потерять прогресс?");
    if (isSure) {
      stopGame("quit");
    }
  };
};
