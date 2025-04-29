const buttonEasy = document.getElementById("easy");
const buttonMedium = document.getElementById("medium");
const buttonHard = document.getElementById("hard");

export const scryptButtonsEasy = () => {
  const btn = buttonEasy.classList.toggle(
    "-translate-y-1",
    "transition-transform",
    "duration-700"
  );;
  if (btn){
    buttonMedium.classList.remove("-translate-y-1", "transition-transform", "duration-700");
    buttonHard.classList.remove("-translate-y-1", "transition-transform", "duration-700");
  }
};

export const scryptButtonsMedium = () => {
  const btn = buttonMedium.classList.toggle("-translate-y-1", "transition-transform", "duration-700");
  if (btn){
    buttonEasy.classList.remove("-translate-y-1", "transition-transform", "duration-700");
    buttonHard.classList.remove("-translate-y-1", "transition-transform", "duration-700");
  }
};

export const scryptButtonsHard = () => {
  const btn = buttonHard.classList.toggle("-translate-y-1", "transition-transform", "duration-700");
  if (btn){
    buttonEasy.classList.remove("-translate-y-1", "transition-transform", "duration-700");
    buttonMedium.classList.remove("-translate-y-1", "transition-transform", "duration-700");
  }
}