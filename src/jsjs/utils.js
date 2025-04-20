export const darkModeHandle = () => {
    const darkModelSwitcher = document.getElementById('toggleDarkMode')
    const htmlElement = document.documentElement

    if (localStorage.getItem('mode') === 'dark'){
        htmlElement.classList.add('dark')
        darkModelSwitcher.checked = true
    }

    darkModelSwitcher.addEventListener('input', () => {
        htmlElement.classList.toggle('dark')

        if(htmlElement.classList.contains('dark')){
            localStorage.setItem('mode', 'dark')
        } else{
            localStorage.setItem('mode', 'light')
        }
    })
}
