

// Simple clientside validation

(function () {
    "use strict";

    const form = document.getElementById("contactForm");
    if (!form) return;

    const fields = {
        name:    { el: document.getElementById("name"),    err: document.getElementById("name-error"),    minLen: 2  },
        email:   { el: document.getElementById("email"),   err: document.getElementById("email-error"),   minLen: 5  },
        subject: { el: document.getElementById("subject"), err: document.getElementById("subject-error"), minLen: 3  },
        message: { el: document.getElementById("message"), err: document.getElementById("message-error"), minLen: 10 }
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate one field and returns true if its valid.
    function validateField(key) {
        const field = fields[key];
        const value = field.el.value.trim();

        // Nothing in the input
        if (value.length === 0) {
            showError(field, "This field is required.");
            return false;
        }

        // Checks the length
        if (value.length < field.minLen) {
            showError(field, "Please enter at least " + field.minLen + " characters.");
            return false;
        }

        // Checking if a valid email is aactually entered
        if (key === "email" && !emailPattern.test(value)) {
            showError(field, "Please enter a valid email address.");
            return false;
        }

        clearError(field);
        return true;
    }

    function showError(field, msg) {
        field.err.textContent = msg;
        field.el.classList.add("invalid");
    }

    function clearError(field) {
        field.err.textContent = "";
        field.el.classList.remove("invalid");
    }

    // Validate on blur when user moves out of a field
    Object.keys(fields).forEach(function (key) {
        fields[key].el.addEventListener("blur", function () {
            validateField(key);
        });

        // Feedback as they type
        fields[key].el.addEventListener("input", function () {
            if (fields[key].el.classList.contains("invalid")) {
                validateField(key);
            }
        });
    });

    // EVERYTHING is validated on the submission
    form.addEventListener("submit", function (event) {
        let allValid = true;
        Object.keys(fields).forEach(function (key) {
            const ok = validateField(key);
            if (!ok) allValid = false;
        });

        if (!allValid) {
            event.preventDefault();
            // Focus the first invalid field
            const firstInvalid = form.querySelector(".invalid");
            if (firstInvalid) firstInvalid.focus();
        }
    });

})();
