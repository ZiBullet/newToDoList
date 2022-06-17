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
    error.length === 0 ? submit() : console.log('Fill the missed fields!')
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
        // Elements which would be clicked to open the modal window
        let modals = document.querySelectorAll('.modal2Open')
        // Elements which would be clicked to close the modal window
        let btnsCloser = document.querySelectorAll('.toClose')
        // Span which would be shown to user as the current name
        let currentName = document.querySelector('.name')
        // Input to change the name
        let name2Change = document.querySelector('.currentName')
        // Function to remove the card box
        remove.onclick = () => {
            let idx = taskInfo.indexOf(info)
            taskInfo.splice(idx, 1)
            // The error with opening the modal has been solved
            toClose(modals)
            showMyTask(taskInfo)
        }
        // Function to open the modal of name changer
        cardBox.onclick = () => {
            modals.forEach(modal => {
                toOpen(modal)
            })
            // The current name parameters
            currentName.innerHTML = info.title.toUpperCase()
            name2Change.value = info.title
        }
        // The name changes after closing the modal window
        btnsCloser.forEach(btn => {
            btn.onclick = () => {
                toClose(modals)
                info.title = name2Change.value 
                showMyTask(taskInfo)
            }
        })
    }
}
showMyTask(tasks)
// Function to open the modal window
function toOpen (modal) {
    if (modal.classList.contains('modal__bg')) {
        modal.style.display = 'block'
    } else {
        modal.style.display = 'flex'
    }
    setTimeout(() => {
        modal.style.opacity = '1'
    }, 300);
}
// Function to close the modal window
function toClose(closes) {
    closes.forEach(close => {
        close.style.opacity = '0'
        setTimeout(() => {
            close.style.display = 'none'
        }, 300);
    })
}