
// Simple clientside validation

const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const nameErr = document.getElementById("name-error");

const emailInput = document.getElementById("email");
const emailErr = document.getElementById("email-error");

const subjectInput = document.getElementById("subject");
const subjectErr = document.getElementById("subject-error");

const messageInput = document.getElementById("message");
const messageErr = document.getElementById("message-error");

// Checking if a valid email is aactually entered
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validate name on blur
nameInput.addEventListener("blur", function () {
    if (nameInput.value.trim().length === 0) {
        nameErr.textContent = "This field is required.";
        nameInput.classList.add("invalid");
    } else if (nameInput.value.trim().length < 2) {
        nameErr.textContent = "Please enter at least 2 characters.";
        nameInput.classList.add("invalid");
    } else {
        nameErr.textContent = "";
        nameInput.classList.remove("invalid");
    }
});

nameInput.addEventListener("input", function () {
    if (nameInput.classList.contains("invalid")) {
        if (nameInput.value.trim().length >= 2) {
            nameErr.textContent = "";
            nameInput.classList.remove("invalid");
        }
    }
});

// validate email on blur
emailInput.addEventListener("blur", function () {
    if (emailInput.value.trim().length === 0) {
        emailErr.textContent = "This field is required.";
        emailInput.classList.add("invalid");
    } else if (!emailPattern.test(emailInput.value.trim())) {
        emailErr.textContent = "Please enter a valid email address.";
        emailInput.classList.add("invalid");
    } else {
        emailErr.textContent = "";
        emailInput.classList.remove("invalid");
    }
});

emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("invalid")) {
        if (emailPattern.test(emailInput.value.trim())) {
            emailErr.textContent = "";
            emailInput.classList.remove("invalid");
        }
    }
});

// validate subject on blur
subjectInput.addEventListener("blur", function () {
    if (subjectInput.value.trim().length === 0) {
        subjectErr.textContent = "This field is required.";
        subjectInput.classList.add("invalid");
    } else if (subjectInput.value.trim().length < 3) {
        subjectErr.textContent = "Please enter at least 3 characters.";
        subjectInput.classList.add("invalid");
    } else {
        subjectErr.textContent = "";
        subjectInput.classList.remove("invalid");
    }
});

subjectInput.addEventListener("input", function () {
    if (subjectInput.classList.contains("invalid")) {
        if (subjectInput.value.trim().length >= 3) {
            subjectErr.textContent = "";
            subjectInput.classList.remove("invalid");
        }
    }
});

// validate message on blur
messageInput.addEventListener("blur", function () {
    if (messageInput.value.trim().length === 0) {
        messageErr.textContent = "This field is required.";
        messageInput.classList.add("invalid");
    } else if (messageInput.value.trim().length < 10) {
        messageErr.textContent = "Needs to be at least 10 characters.";
        messageInput.classList.add("invalid");
    } else {
        messageErr.textContent = "";
        messageInput.classList.remove("invalid");
    }
});

messageInput.addEventListener("input", function () {
    if (messageInput.classList.contains("invalid")) {
        if (messageInput.value.trim().length >= 10) {
            messageErr.textContent = "";
            messageInput.classList.remove("invalid");
        }
    }
});

// EVERYTHING is validated on the submission
form.addEventListener("submit", function (event) {
    let allValid = true;

    if (nameInput.value.trim().length < 2) {
        nameErr.textContent = nameInput.value.trim().length === 0 ? "This field is required." : "Please enter at least 2 characters.";
        nameInput.classList.add("invalid");
        allValid = false;
    }

    if (emailInput.value.trim().length === 0 || !emailPattern.test(emailInput.value.trim())) {
        emailErr.textContent = emailInput.value.trim().length === 0 ? "This field is required." : "Please enter a valid email address.";
        emailInput.classList.add("invalid");
        allValid = false;
    }

    if (subjectInput.value.trim().length < 3) {
        subjectErr.textContent = subjectInput.value.trim().length === 0 ? "This field is required." : "Please enter at least 3 characters.";
        subjectInput.classList.add("invalid");
        allValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        messageErr.textContent = messageInput.value.trim().length === 0 ? "This field is required." : "Needs to be at least 10 characters.";
        messageInput.classList.add("invalid");
        allValid = false;
    }

    if (!allValid) {
        event.preventDefault();
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
    }
});
