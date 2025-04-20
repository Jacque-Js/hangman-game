import { defineConfig } from 'vite';

export default defineConfig({
  base: "/hangman-game/",  // Для GitHub Pages
  root: '.',               // Корень проекта (по умолчанию и так ".")
  publicDir: 'public',     // Папка со статикой
});