// Finding my form and container
const form = document.forms.adder
const inputs = form.querySelectorAll('input')
const container = document.querySelector('.card__container')
// The const where I would collect all tasks
const tasks = []
// Collecting the info about a task
form.onsubmit = (event) => {
    event.preventDefault()
    // Checking for errors. If there is one, it would not work
    let error = []
    inputs.forEach(input => {
        if (input.value.length === 0 ) {
            error.push('error')
        } 
    })
    error.length === 0 ? submit() : console.log('А хулиган! Тестируйте мой код?')
}
// The info
function submit() {
    let task = {}
    
    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    tasks.push(task)
    showMyTask(tasks)
}
function showMyTask (taskInfo) {
    container.innerHTML = ''
    for (let info of taskInfo) {
        // Creating my card
        // My card
        let cardBox = document.createElement('div')
        // The top of it
        let cardHeading = document.createElement('div')
        let h4 = document.createElement('h4')
        let remove = document.createElement('img')
        // The bottom of it
        let cardBottom = document.createElement('div')
        let spanTime = document.createElement('span')
        // Decorating the card
        cardBox.classList.add('card')
        cardHeading.classList.add('card__heading')
        h4.innerHTML = info.title
        remove.src = './assets/svg/cross__lines.svg'
        cardBottom.classList.add('card__date')
        spanTime.innerHTML = info.time
        // Mmm... Its time to connect each of them to other
        container.append(cardBox)
        cardBox.append(cardHeading, cardBottom)
        cardHeading.append(h4, remove)
        cardBottom.append(spanTime)
        // Events
        remove.onclick = () => {
            let idx = taskInfo.indexOf(info)
            taskInfo.splice(idx, 1)
            showMyTask(taskInfo)
        }
    }
}