let but = document.querySelector("button")
let divs = document.querySelectorAll('div')

let i = 0

divs.forEach(div => div.style.display = 'none')
    divs[i%2].style.display = 'block'
    i++;

but.addEventListener('click', () => {
    divs.forEach(div => div.style.display = 'none')
    divs[i%2].style.display = 'block'
    i++;

})