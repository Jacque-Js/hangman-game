import '../css/style.css'
import { darkModeHandle } from './utils'
import { langModeHandle } from './lang.js'
import { startGame } from './game'

darkModeHandle()
langModeHandle()

const startGameBtn = document.getElementById('startGame')

startGameBtn.addEventListener('click', startGame)
