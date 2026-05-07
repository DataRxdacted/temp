// contact form validation

const form = document.getElementById('contactForm')
const emailRegex = /\S+@\S+\.\S+/

function showError(input, errSpan, msg) {
    input.classList.add('invalid')
    errSpan.textContent = msg
}

function clearError(input, errSpan) {
    input.classList.remove('invalid')
    errSpan.textContent = ''
}

form.addEventListener('submit', function(e) {

    const name = document.getElementById('name')
    const nameErr = document.getElementById('name-error')
    const email = document.getElementById('email')
    const emailErr = document.getElementById('email-error')
    const subject = document.getElementById('subject')
    const subjectErr = document.getElementById('subject-error')
    const message = document.getElementById('message')
    const messageErr = document.getElementById('message-error')

    let valid = true

    // clear old errors first
    clearError(name, nameErr)
    clearError(email, emailErr)
    clearError(subject, subjectErr)
    clearError(message, messageErr)

    if (name.value.trim().length < 2) {
        showError(name, nameErr, 'Name must be at least 2 characters.')
        valid = false
    }

    // Checking if a valid email is aactually entered
    if (!emailRegex.test(email.value.trim())) {
        showError(email, emailErr, 'Please enter a valid email.')
        valid = false
    }

    if (subject.value.trim().length < 3) {
        showError(subject, subjectErr, 'Subject is too short.')
        valid = false
    }

    if (message.value.trim().length < 20) {
        showError(message, messageErr, 'Message needs to be at least 20 characters.')
        valid = false
    }

    if (!valid) {
        e.preventDefault()
    }
})
