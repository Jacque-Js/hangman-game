
export const difficultButton = () => {

const easyBtn = document.getElementById('easy')
const mediumBtn = document.getElementById('medium')
const hardBtn = document.getElementById('hard')

easyBtn.addEventListener('click', () => {
    sessionStorage.setItem('difficult', 'Easy')
})
mediumBtn.addEventListener('click', () => {
    sessionStorage.setItem('difficult', 'Medium')
})
hardBtn.addEventListener('click', () => {
    sessionStorage.setItem('difficult', 'Hard')
})

}