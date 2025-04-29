import '../css/style.css'
import { darkModeHandle } from './utils'
import { langModeHandle } from './lang.js'
import { startGame } from './game'
import { difficultButton } from './difficult.js'
import {
  scryptButtonsEasy,
  scryptButtonsMedium,
  scryptButtonsHard,
} from "./buttons.js";

difficultButton()
darkModeHandle()
langModeHandle()

const startGameBtn = document.getElementById('startGame')

const styleBtnEasy = document.getElementById('easy')
const styleBtnMedium = document.getElementById('medium')
const styleBtnHard = document.getElementById('hard')


startGameBtn.addEventListener('click', startGame)

styleBtnEasy.addEventListener("click", scryptButtonsEasy)
styleBtnMedium.addEventListener("click", scryptButtonsMedium)
styleBtnHard.addEventListener("click", scryptButtonsHard)
